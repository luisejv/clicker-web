import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPublishedComponent } from './car-published.component';

describe('CarPublishedComponent', () => {
  let component: CarPublishedComponent;
  let fixture: ComponentFixture<CarPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPublishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
