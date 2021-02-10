import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSemiNuevoComponent } from './auto-semi-nuevo.component';

describe('AutoSemiNuevoComponent', () => {
  let component: AutoSemiNuevoComponent;
  let fixture: ComponentFixture<AutoSemiNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoSemiNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSemiNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
