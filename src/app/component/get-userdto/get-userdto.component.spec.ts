import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserdtoComponent } from './get-userdto.component';

describe('GetUserdtoComponent', () => {
  let component: GetUserdtoComponent;
  let fixture: ComponentFixture<GetUserdtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetUserdtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetUserdtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
