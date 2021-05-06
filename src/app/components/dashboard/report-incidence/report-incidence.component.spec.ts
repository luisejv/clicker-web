import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidenceComponent } from './report-incidence.component';

describe('ReportIncidenceComponent', () => {
  let component: ReportIncidenceComponent;
  let fixture: ComponentFixture<ReportIncidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportIncidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
