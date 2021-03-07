import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSaleRegistrationComponent } from './car-sale-registration.component';

describe('CarSaleRegistrationComponent', () => {
  let component: CarSaleRegistrationComponent;
  let fixture: ComponentFixture<CarSaleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSaleRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSaleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
