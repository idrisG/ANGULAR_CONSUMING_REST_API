import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Userdto } from 'src/app/model/userdto';
import { UserdtoService } from 'src/app/service/userdto.service';

import { GetUserdtoComponent } from './get-userdto.component';

describe('GetUserdtoComponent', () => {
  let component: GetUserdtoComponent;
  let fixture: ComponentFixture<GetUserdtoComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let user = new Userdto(0,'username','1996-01-01','France','0102030405','MALE');
  let FakeUserdtoService : Pick<UserdtoService, keyof UserdtoService>={
    createUser : jasmine.createSpy('createUser').and.returnValue(of(user)),
    getUser : jasmine.createSpy('getUser').and.returnValue(of(user)),
    getAllUser : jasmine.createSpy('getAllUser').and.returnValue(of([user]))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide:UserdtoService, useValue:FakeUserdtoService}],
      declarations: [ GetUserdtoComponent ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(GetUserdtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`dosen't display any users if no user selected`, ()=>{
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
  });

  it('display the user when retrieving a user', ()=>{
    fixture.nativeElement.querySelector('input').value='0';
    fixture.nativeElement.querySelectorAll('button')[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('table')).not.toBeNull();
    expect(component.allUserdto[0]).toEqual(user);
  });
  
  it('display all users when retrieving all users', ()=>{
    fixture.nativeElement.querySelectorAll('button')[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('table')).not.toBeNull();
    expect(component.allUserdto).toEqual([user]);
  });
});
