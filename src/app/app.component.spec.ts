import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { AppComponent } from './app.component';
import { LoginService } from './service/login.service';
import {RouterTestingModule} from '@angular/router/testing' ;
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';

describe('AppComponent', () => {
    const FakeLoginService : Pick<LoginService, keyof LoginService> = {
    login : jasmine.createSpy('login').and.returnValue(of(true)),
    confirmLogged(logged :boolean){
      this.whenLoggedIn().next(logged);
    },
    setToken(token : string){},
    getToken(){return "";},
    whenLoggedIn(){
      return new ReplaySubject<boolean>(1);
    }
  };
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router : Router;
  let mockRouter = jasmine.createSpyObj('Router',['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([{path:'login',component:LoginComponent}])],
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
/*
  it(`should have as title 'add-user-app-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('add-user-app-frontend');
  });*/
/*
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('add-user-app-frontend app is running!');
  });*/
  it('navigate through navbar ', ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    router.navigate(['login']).then(()=>{
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/login`;  
      expect(router.url).toEqual('/login');    
    });
    expect(app).toBeTruthy();
  });
});
