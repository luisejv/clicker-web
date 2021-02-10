import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
declare var $: any;

interface Car {
  nombre: string;
  disponible: string;
  precio: number;
  kilometraje: number;
  motor: string;
  cambios: string;
  photo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  carType: string = 'SUV';
  carSubset: string = 'ALL';

  carBrand: string = 'TESLA';
  carModel: string = 'MODEL X';
  carMaxPrice: number = 5000;

  recentCars: Car[];

  constructor(private router: Router) {
    // TODO: hacer el request de recent cars aqui
    this.recentCars = TEST_CARS;
  }

  ngOnInit(): void {}

  changeCarType(type: string): void {
    this.carType = type;
    console.log('Car Type: ', this.carType);
  }

  changeCarSubset(subset: string): void {
    this.carSubset = subset;
    console.log('Car Subset: ', this.carSubset);
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
    const body: CarSearchFilter = {
      carType: this.carType,
      carSubset: this.carSubset,
      carBrand: this.carBrand,
      carModel: this.carModel,
      carMaxPrice: this.carMaxPrice,
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }
}

const TEST_CARS: Car[] = [
  {
    nombre: 'Toyota Yaris 2019',
    cambios: 'Mecánico',
    disponible: 'Lima',
    kilometraje: 360000,
    motor: 'Gasolina',
    precio: 45000,
    photo: 'assets/media/content/b-goods/263x200/1.jpg',
  },
  {
    nombre: 'Kia Rio 2021',
    cambios: 'Automático',
    disponible: 'Chiclayo',
    kilometraje: 260000,
    motor: 'Petróleo',
    precio: 40000,
    photo: 'assets/media/content/b-goods/263x200/2.jpg',
  },
];
