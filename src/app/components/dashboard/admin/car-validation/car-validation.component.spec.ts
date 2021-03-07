import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarValidationComponent } from './car-validation.component';

describe('CarValidationComponent', () => {
  let component: CarValidationComponent;
  let fixture: ComponentFixture<CarValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
