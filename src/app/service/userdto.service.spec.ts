import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Userdto } from '../model/userdto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { UserdtoService } from './userdto.service';

describe('UserdtoService', () => {
  let service: UserdtoService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const userdto = new Userdto(1, "hubert","1997-01-01","0102030405","MALE");
  const allUserdto = [userdto];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserdtoService ]
    });
    service = TestBed.inject(UserdtoService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('tests call http GET Method', done => {
    service.getUser(1).subscribe((user)=>{
      expect(user).toEqual(userdto);
      done(); //Don't forget at end of subscribe or it will timeout
    });
    const req = httpMock.expectOne('http://localhost:8080/users/1');
    expect(req.request.method).toEqual('GET');
    req.flush(userdto);
    httpMock.verify();
  });

  it('test call http GET all Method', done => {
    service.getAllUser().subscribe((users)=>{
      expect(users).toEqual(allUserdto);
      done();
    });
    const req = httpMock.expectOne('http://localhost:8080/users');
    expect(req.request.method).toEqual('GET');
    req.flush(allUserdto);
    httpMock.verify();
  });

  it('test call http POST Method', done => {
    service.createUser(JSON.stringify(userdto)).subscribe(user => {
      expect(user).toEqual(userdto);
      done();
    });
    const req = httpMock.expectOne('http://localhost:8080/users');
    expect(req.request.method).toEqual('POST');
    req.flush(userdto);
    httpMock.verify();
  });
});
