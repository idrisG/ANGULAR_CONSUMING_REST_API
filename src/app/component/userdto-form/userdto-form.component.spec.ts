import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdtoFormComponent } from './userdto-form.component';

describe('UserdtoFormComponent', () => {
  let component: UserdtoFormComponent;
  let fixture: ComponentFixture<UserdtoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdtoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdtoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
