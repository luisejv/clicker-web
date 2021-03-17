import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInterestComponent } from './car-interest.component';

describe('CarInterestComponent', () => {
  let component: CarInterestComponent;
  let fixture: ComponentFixture<CarInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
