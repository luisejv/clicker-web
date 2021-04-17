import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCuComponent } from './car-cu.component';

describe('CarCuComponent', () => {
  let component: CarCuComponent;
  let fixture: ComponentFixture<CarCuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
