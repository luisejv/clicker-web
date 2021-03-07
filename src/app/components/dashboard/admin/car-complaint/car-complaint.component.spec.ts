import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarComplaintComponent } from './car-complaint.component';

describe('CarComplaintComponent', () => {
  let component: CarComplaintComponent;
  let fixture: ComponentFixture<CarComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
