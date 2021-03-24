import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaxCarsComponent } from './remax-cars.component';

describe('RemaxCarsComponent', () => {
  let component: RemaxCarsComponent;
  let fixture: ComponentFixture<RemaxCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemaxCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemaxCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
