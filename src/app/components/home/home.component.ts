import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carType: string = 'PICKUP';
  carSubset: string = 'ALL';

  carBrand: string = 'AUDI';
  carModel: string = 'MODEL1';
  carMaxPrice: number = 5000;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  changeCarType(type: string): void {
    this.carType = type;
    console.log('Car Type: ', this.carType);
  }

  changeCarSubset(subset: string): void {
    this.carSubset = subset;
    console.log('Car Subset: ', this.carSubset);;
  }

  changeCarBrand(brand: any): void {
    this.carBrand = brand.target.value;
    console.log('Car Brand: ', this.carBrand);
  }

  changeCarModel(model: any): void {
    this.carModel = model.target.value;
    console.log('Car Model: ', this.carModel);
  }

  changeCarMaxPrice(price: any): void {
    let dirtyPrice: string = price.target.value;
    this.carMaxPrice = Number(dirtyPrice.split('$')[1]);
    console.log('Car Max Price: ', this.carMaxPrice);
  }

  searchCar(): void {
    this.router.navigate(['/inventory-listings'], {
      queryParams:
        {
          carType: this.carType,
          carSubset: this.carSubset,
          carBrand: this.carBrand,
          carModel: this.carModel,
          carMaxPrice: this.carMaxPrice,
        }
      }
    );
  }

}
