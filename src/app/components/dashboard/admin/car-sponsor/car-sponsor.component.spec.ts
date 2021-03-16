import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSponsorComponent } from './car-sponsor.component';

describe('CarSponsorComponent', () => {
  let component: CarSponsorComponent;
  let fixture: ComponentFixture<CarSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
