import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { JwtResponse } from '../model/jwt-response.model';
import { LoginService } from '../service/login.service';

import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';

describe('AuthInterceptorInterceptor', () => {

  let FakeLoginService : Pick<LoginService, keyof LoginService>={
    loginToken : jasmine.createSpy('loginToken').and.returnValue(of(new JwtResponse("type","token","username",["role"]))),
    login : jasmine.createSpy('login').and.returnValue(of(true)),
    whenLoggedIn(){
      return new ReplaySubject<boolean>(1);
    },
    whenToken(){
      return new ReplaySubject<string>(1);
    },
    confirmLogged(logged:boolean){
      this.whenLoggedIn().next(logged);
    },
    confirmToken(token:string){
      this.whenToken().next(token);
    },
    logout(){}

  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      HttpClientTestingModule,
      {provide:LoginService, useValue:FakeLoginService},
      AuthInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptorInterceptor = TestBed.inject(AuthInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
