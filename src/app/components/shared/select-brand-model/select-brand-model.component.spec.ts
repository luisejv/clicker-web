import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBrandModelComponent } from './select-brand-model.component';

describe('SelectBrandModelComponent', () => {
  let component: SelectBrandModelComponent;
  let fixture: ComponentFixture<SelectBrandModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBrandModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBrandModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
