import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmenttodayComponent } from './appointmenttoday.component';

describe('AppointmenttodayComponent', () => {
  let component: AppointmenttodayComponent;
  let fixture: ComponentFixture<AppointmenttodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmenttodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmenttodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
