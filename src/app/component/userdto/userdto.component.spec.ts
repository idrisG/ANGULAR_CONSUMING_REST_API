import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdtoComponent } from './userdto.component';

describe('UserdtoComponent', () => {
  let component: UserdtoComponent;
  let fixture: ComponentFixture<UserdtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
