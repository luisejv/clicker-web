import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoNuevoComponent } from './auto-nuevo.component';

describe('AutoNuevoComponent', () => {
  let component: AutoNuevoComponent;
  let fixture: ComponentFixture<AutoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
