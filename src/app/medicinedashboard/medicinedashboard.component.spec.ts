import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinedashboardComponent } from './medicinedashboard.component';

describe('MedicinedashboardComponent', () => {
  let component: MedicinedashboardComponent;
  let fixture: ComponentFixture<MedicinedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
