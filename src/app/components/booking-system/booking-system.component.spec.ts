import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSystemComponent } from './booking-system.component';

describe('BookingSystemComponent', () => {
  let component: BookingSystemComponent;
  let fixture: ComponentFixture<BookingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
