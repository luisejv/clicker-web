import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

// declare var noUiSlider: any;

// declare module noUiSlider {
//   interface noUiSlider {
//   }

//   interface Instance extends HTMLElement {
//       noUiSlider: noUiSlider
//   }
// }

@Component({
  selector: 'app-published-cars',
  templateUrl: './published-cars.component.html',
  styleUrls: ['./published-cars.component.css']
})
export class PublishedCarsComponent implements OnInit {

  carros: any[];
  filteredCarros: any[];
  minPrice: number = 5000;
  maxPrice: number = 35000;
  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    translate: (value: number, label: LabelType): string => {
      this.filteredCarros = this.carros.filter((carro: any) => {
        return carro.price >= this.minPrice && carro.price <= this.maxPrice;
      });
      return "";
    }
  };

  constructor(
    private dataService: DataService,
  ) {
    //TODO: mandar request de carros publicados y asignarselo a 'this.carros'
    this.carros = this.dataService.carros;
    this.filteredCarros = this.carros;
  }

  ngOnInit(): void {
    // var keypressSlider = document.getElementById('filterPrice') as noUiSlider.Instance;
    // var input0 = document.getElementById( 'input-with-keypress-0' );
    // var input1 = document.getElementById( 'input-with-keypress-1' );

    // noUiSlider.create( keypressSlider, {
    //   start: [ 5000, 35000 ],
    //   connect: true,
    //   step: 100,
    //   format: wNumb( {
    //     decimals: 0,
    //     prefix: '$',
    //     thousand: ','
    //   } ),
    //   range: {
    //     'min': 1000,
    //     'max': 50000
    //   }
    // });

    // keypressSlider?.noUiSlider.on( 'update', ( values: any, handle: any ) => {
    //   this.minPrice = values[0];
    //   this.maxPrice = values[1];
    //   console.group('Price Range');
    //   console.log(`${this.minPrice} - ${this.maxPrice}`);
    //   console.groupEnd();
    // });
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredCarros = this.carros.filter((carro: any) => {
      return this._normalizeValue(carro.name).includes(normalizedQuery);
      // * || this._normalizeValue(carro.otherProperty).includes(normalizedQuery);
    });
  }

}
