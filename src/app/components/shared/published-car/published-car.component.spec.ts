import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedCarComponent } from './published-car.component';

describe('PublishedCarComponent', () => {
  let component: PublishedCarComponent;
  let fixture: ComponentFixture<PublishedCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
