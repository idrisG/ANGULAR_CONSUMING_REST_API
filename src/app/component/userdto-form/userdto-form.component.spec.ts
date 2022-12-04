import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { Userdto } from 'src/app/model/userdto';
import { LoginService } from 'src/app/service/login.service';
import { UserdtoService } from 'src/app/service/userdto.service';

import { UserdtoFormComponent } from './userdto-form.component';

describe('UserdtoFormComponent', () => {
  let component: UserdtoFormComponent;
  let fixture: ComponentFixture<UserdtoFormComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let formBuilder: FormBuilder;
  let user = new Userdto(0,"username",'1996-01-01','France','0102030405','MALE');
  const FakeLoginService : Pick<LoginService, 'whenLoggedIn'> = {
    whenLoggedIn : jasmine.createSpy('whenLoggedIn').and.returnValue(new ReplaySubject<boolean>(1))
  };
  const FakeUserdtoService: Pick<UserdtoService, keyof UserdtoService>={
    createUser: jasmine.createSpy('createUser').and.returnValue(of(user)),
    getUser : jasmine.createSpy('getUser').and.returnValue(of(user)),
    getAllUser : jasmine.createSpy('getAllUser').and.returnValue(of([user]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [HttpClientTestingModule,
        {provide:LoginService, useValue:FakeLoginService},
        {provide:UserdtoService, useValue:FakeUserdtoService}
      ],
      declarations: [ UserdtoFormComponent ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(UserdtoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`dosen't display the form if not logged in`, ()=>{
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
  });

  it('displays the form if logged in', ()=>{
    component.loggedIn = of(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).not.toBeNull();
  });

  it('checks the initial value of the form', ()=>{
    const userFormValue = {
      username:'',
      birthdate:'',
      country:'France',
      phoneNumber:null,
      gender:null
    };
    expect(component.formUser.value).toEqual(userFormValue);
  });

  it('check input of form without error', ()=>{
    const userFormValue = {
      username:'username',
      birthdate:'1996-01-01',
      country:'France',
      phoneNumber:null,
      gender:null
    };
    component.loggedIn = of(true);
    fixture.detectChanges();
    const usernameInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    const birthdateInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#birthdate');
    const countryInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#country');
    usernameInput.value = 'username';
    birthdateInput.value = '1996-01-01';
    countryInput.value = 'France';
    usernameInput.dispatchEvent(new Event('input'));
    birthdateInput.dispatchEvent(new Event('input'));
    countryInput.dispatchEvent(new Event('select'));
    expect(component.formUser.value).toEqual(userFormValue);
  });
  it('check 3 errors in case of form full of error', ()=>{
    component.loggedIn = of(true);
    fixture.detectChanges();
    const usernameInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    const birthdateInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#birthdate');
    const phoneNumberInput : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#phoneNumber');
    usernameInput.value = '!';
    birthdateInput.value = '';
    phoneNumberInput.value = '0102';
    usernameInput.dispatchEvent(new Event('input'));
    birthdateInput.dispatchEvent(new Event('input'));
    phoneNumberInput.dispatchEvent(new Event('input'));
    expect(component.formUser.get('username')?.errors).not.toBeNull();
    expect(component.formUser.get('birthdate')?.errors).not.toBeNull();
    expect(component.formUser.get('phoneNumber')?.errors).not.toBeNull();
  });
});
