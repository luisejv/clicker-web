import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { ModesEnum } from 'src/app/core/interfaces/modes.enum';

@Component({
  selector: 'app-inventory-listings',
  templateUrl: './inventory-listings.component.html',
  styleUrls: ['./inventory-listings.component.css']
})
export class InventoryListingsComponent implements OnInit {

  mode: ModesEnum = ModesEnum.USER_SEARCH;
  filters!: CarSearchFilter;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(
      (params) => {
        // siempre mandará todos los parámetros así que normal hacer esto
        this.filters = params as CarSearchFilter;
      },
      (error: any) => {
        console.error(
          'when sending filter params to published-car.component.ts: ',
          error
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
