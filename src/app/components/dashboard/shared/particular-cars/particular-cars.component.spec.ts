import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularCarsComponent } from './particular-cars.component';

describe('ParticularCarsComponent', () => {
  let component: ParticularCarsComponent;
  let fixture: ComponentFixture<ParticularCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
