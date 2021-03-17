import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedCarsComponent } from './interested-cars.component';

describe('InterestedCarsComponent', () => {
  let component: InterestedCarsComponent;
  let fixture: ComponentFixture<InterestedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestedCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
