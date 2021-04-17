import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEditingComponent } from './car-editing.component';

describe('CarEditingComponent', () => {
  let component: CarEditingComponent;
  let fixture: ComponentFixture<CarEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
