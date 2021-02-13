import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  carType: string = 'SUV';
  carSubset: string = 'ALL';

  carBrand: string = 'Toyota';
  carModel: string = 'Yaris';
  carMaxPrice: number = 5000;

  recentCars!: AutoSemiNuevo[];
  sponsoredCars!: AutoSemiNuevo[];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientService.getRecentCars().subscribe(
      (response: AutoSemiNuevo[]) => {
        this.recentCars = response;
        this.clientService.getSponsoredCars().subscribe(
          (response: SponsoredCar[]) => {
            console.log('Response Sponsored: ', response);
            this.sponsoredCars = response
              .sort((a, b) => a.level - b.level)
              .map((elem: SponsoredCar) => elem.autoSemiNuevo);
          },
          (error: any) => {
            console.log('Error fetching sponsoredCars: ', error);
          }
        );
      },
      (error: any) => {
        console.log('Error fetching recentCars: ', error);
      }
    );
  }

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
      allCars: false,
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  toListings(): void {
    this.router.navigate(['/inventory-listings'], {
      state: { carType: 'usados' },
    });
  }
  goToCarSearch(): void {
    const body: CarSearchFilter = {
      carType: '',
      carSubset: '',
      carBrand: '',
      carModel: '',
      carMaxPrice: 0,
      allCars: true,
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  goToCarRegistration(): void {
    if (this.storageService.isLoggedIn()) {
      //TODO: redirect to car-registration
      console.log('redirect to car-registration');
    } else {
      //TODO: register to login/register, then to car-registration
      console.log('register to login/register, then to car-registration');
    }
  }
}

// const TEST_CARS: AutoSemiNuevo[] = [
//   {
//     usuario: {
//       correo: 'luis.jauregui@utec.edu.pe'
//     },
//     color: 'azul',
//     marca: 'Toyota',
//     modelo: 'Yaris',
//     anoFabricacion: 2019,
//     tipoCambios: 'Mecánico',
//     locaciones: {
//       id: '1',
//       departamento: 'Lima',
//     },
//     kilometraje: 360000,
//     tipoCombustible: 'Gasolina',
//     precioVenta: 45000,
//     fotoPrincipal: 'assets/media/content/b-goods/263x200/1.jpg',
//   },
//   {
//     marca: 'Kia',
//     modelo: 'Rio',
//     anoFabricacion: 2021,
//     tipoCambios: 'Automático',
//     locaciones: {
//       id: '10',
//       departamento: 'Chiclayo',
//     },
//     kilometraje: 260000,
//     tipoCombustible: 'Petróleo',
//     precioVenta: 40000,
//     fotoPrincipal: 'assets/media/content/b-goods/263x200/2.jpg',
//   },
// ];

// const SPONSOR_TEST: AutoSemiNuevo[] = [
//   {
//     marca: 'Toyota',
//     modelo: 'Yaris',
//     anoFabricacion: '2019',
//     tipoCambios: 'Mecánico',
//     locaciones: {
//       id: '1',
//       departamento: 'Lima',
//     },
//     kilometraje: 360000,
//     tipoCombustible: 'Gasolina',
//     precioVenta: 45000,
//     fotoPrincipal: 'assets/media/content/b-goods/slider/1.png',
//   },
//   {
//     marca: 'Kia',
//     modelo: 'Rio',
//     anoFabricacion: '2021',
//     tipoCambios: 'Automático',
//     locaciones: {
//       id: '10',
//       departamento: 'Chiclayo',
//     },
//     kilometraje: 260000,
//     tipoCombustible: 'Petróleo',
//     precioVenta: 40000,
//     fotoPrincipal: 'assets/media/content/b-goods/slider/2.png',
//   },
//   {
//     marca: 'Toyota',
//     modelo: 'Yaris',
//     anoFabricacion: '2019',
//     tipoCambios: 'Mecánico',
//     locaciones: {
//       id: '1',
//       departamento: 'Lima',
//     },
//     kilometraje: 360000,
//     tipoCombustible: 'Gasolina',
//     precioVenta: 45000,
//     fotoPrincipal: 'assets/media/content/b-goods/slider/1.png',
//   },
//   {
//     marca: 'Kia',
//     modelo: 'Rio',
//     anoFabricacion: '2021',
//     tipoCambios: 'Automático',
//     locaciones: {
//       id: '10',
//       departamento: 'Chiclayo',
//     },
//     kilometraje: 260000,
//     tipoCombustible: 'Petróleo',
//     precioVenta: 40000,
//     fotoPrincipal: 'assets/media/content/b-goods/slider/2.png',
//   },
// ];
