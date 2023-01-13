import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdashboardComponent } from './labdashboard.component';

describe('LabdashboardComponent', () => {
  let component: LabdashboardComponent;
  let fixture: ComponentFixture<LabdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
