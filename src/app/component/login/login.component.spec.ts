import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, ReplaySubject } from 'rxjs';
import { JwtResponse } from 'src/app/model/jwt-response.model';
import { LoginRequest } from 'src/app/model/login-request.model';
import { LoginService } from 'src/app/service/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const FakeLoginService : Pick<LoginService, keyof LoginService> = {
    login: jasmine.createSpy('login').and.returnValue(of(true)),
    confirmLogged(logged: boolean) {
      this.whenLoggedIn().next(logged);
    },
    getToken() { return ""; },
    whenLoggedIn() {
      return new ReplaySubject<boolean>(1);
    },
    whenToken() {
      return new ReplaySubject<string>(1);
    },
    loginToken: jasmine.createSpy('loginToken').and.returnValue(of(new JwtResponse("Bearer","token","username",["ROLE_USER"])))
    ,
    confirmToken: function (token: string): void {
      this.whenToken().next(token);
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      providers: [HttpClientTestingModule,{provide:LoginService, useValue:FakeLoginService}] ,
      declarations: [ LoginComponent ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the form to log in', ()=>{
    expect(fixture.nativeElement.querySelectorAll('input').length).toEqual(2);
    expect(fixture.nativeElement.querySelector('.btn-submit')).not.toBeNull();
  });

  it(`doesn't display the form to already logged in user`, ()=>{
    component.loggedIn=of(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.username')).toBeNull();
  });

  it('assert initial values of loginForm', ()=>{
    const form = component.loginForm;
    const loginFormValue = {
      username:'',
      password:''
    };
    expect(form.value).toEqual(loginFormValue);
  });

  it('check input of username and password', ()=>{
    const loginFormUsernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.username');
    const loginFormPasswordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.password');
    loginFormUsernameElement.value = "username";
    loginFormPasswordElement.value = "password";
    loginFormUsernameElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const usernameValueFormGroup = component.loginForm.get('username');
    const passwordValueFormGroup = component.loginForm.get('password');
    expect(usernameValueFormGroup?.value).toEqual(loginFormUsernameElement.value);
    expect(passwordValueFormGroup?.value).toEqual(loginFormPasswordElement.value);
    expect(usernameValueFormGroup?.errors).toBeNull();
    expect(passwordValueFormGroup?.errors).toBeNull();
  });

  it('log in after input of username and password', ()=>{
    const loginFormUsernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.username');
    const loginFormPasswordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.password');
    const username = "username";
    loginFormUsernameElement.value = username;
    loginFormPasswordElement.value = "password";
    loginFormUsernameElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('.btn-submit').click();
    expect(component.getUsername()).toEqual(username);
    expect(loginFormUsernameElement.value).toEqual('');
    expect(loginFormUsernameElement.value).toEqual('');
  });
});
