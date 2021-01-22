import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaxComponent } from './remax.component';

describe('RemaxComponent', () => {
  let component: RemaxComponent;
  let fixture: ComponentFixture<RemaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
