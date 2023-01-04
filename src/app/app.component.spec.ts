import { TestBed } from '@angular/core/testing';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { LoginService } from './service/login.service';
import {RouterTestingModule} from '@angular/router/testing' ;
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { JwtResponse } from './model/jwt-response.model';
import { LoginRequest } from './model/login-request.model';

describe('AppComponent', () => {
  const FakeLoginService : Pick<LoginService, keyof LoginService> = {
    login: jasmine.createSpy('login').and.returnValue(of(true)),
    confirmLogged(logged: boolean) {
      this.whenLoggedIn().next(logged);
    },
    getToken() { return ""; },
    whenLoggedIn() {
      return new ReplaySubject<boolean>(1);
    },
    loginToken: jasmine.createSpy('loginToken').and.returnValue(of(new JwtResponse("","","",[""]))),
    confirmToken: function (token: string): void {
      this.whenToken().next(token);
    },
    whenToken: function (): Subject<string> {
      return new ReplaySubject<string>(1);
    }
  };
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router : Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([{path:'login',component:AppComponent}])],
      declarations: [
        AppComponent
      ],
      providers:[{provide:LoginService, useValue:FakeLoginService}] 
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('navigate through navbar ', ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    router.navigate(['login']).then(()=>{
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/login`;  
      expect(router.url).toEqual('/login');    
    });
  });
  
  it('click on menu toggle expect menuChecked to be true', ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    fixture.nativeElement.querySelector('input').click();
    const app = fixture.debugElement.componentInstance;
    expect(app.menuChecked).toBeTrue();
    
  });

  it('logout anavailable since not logged in', ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;    
    fixture.detectChanges(); //necessary to  access async observable
    expect(fixture.nativeElement.querySelector('.log-in')).not.toBeNull();
    fixture.nativeElement.querySelector('.log-in').click();
  });

  it('logout available when already logged in', ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.loggedIn=of(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.log-out')).not.toBeNull();
    fixture.nativeElement.querySelector('.log-out').click();
    console.log();
  })
});
