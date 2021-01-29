import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { ModesEnum } from 'src/app/core/interfaces/modes.enum';

@Component({
  selector: 'app-inventory-listings',
  templateUrl: './inventory-listings.component.html',
  styleUrls: ['./inventory-listings.component.css'],
})
export class InventoryListingsComponent implements OnInit {
  mode: ModesEnum = ModesEnum.USER_SEARCH;
  // filters!: Observable<CarSearchFilter>;
  filters!: CarSearchFilter;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        // siempre mandará todos los parámetros así que normal hacer esto
        console.group('Route Params pasados a Inventory Listings:');
        this.filters = params as CarSearchFilter;
        console.log(this.filters);
        console.groupEnd();
      },
      (error: any) => {
        console.error(
          'when sending filter params to published-car.component.ts: ',
          error
        );
      }
    );
  }
}
