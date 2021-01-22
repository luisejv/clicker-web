import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedCarsComponent } from './published-cars.component';

describe('PublishedCarsComponent', () => {
  let component: PublishedCarsComponent;
  let fixture: ComponentFixture<PublishedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
