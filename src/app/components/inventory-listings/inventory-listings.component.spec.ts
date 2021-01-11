import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListingsComponent } from './inventory-listings.component';

describe('InventoryListingsComponent', () => {
  let component: InventoryListingsComponent;
  let fixture: ComponentFixture<InventoryListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
