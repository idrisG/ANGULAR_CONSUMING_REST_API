import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { map } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test login call http POST Method', done => {
    service.login('token').subscribe(logged => {
      expect(logged).toBeTrue();
      done();
    });
    const req = httpMock.expectOne('http://localhost:8080/employees/login');
    expect(req.request.method).toEqual('POST');
    req.flush(true);
    httpMock.verify();
  });

  it('test login ReplaySubject loggedIn',done => {
    service.confirmLogged(true);
    service.whenLoggedIn().subscribe(logged => {
      expect(logged).toBeTrue();
      done();
    });
  });

});
