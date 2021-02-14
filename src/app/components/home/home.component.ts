import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { DataService } from 'src/app/core/services/data.service';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Observable } from 'rxjs';
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

  carBrands: string[];
  carModels: string[];

  recentCars!: AutoSemiNuevo[];
  sponsoredCars!: AutoSemiNuevo[];
  // sponsoredCars: Observable<any>;

  // availableVehicles: Observable<any>;
  // brandCount: Observable<any>;
  // userCount: Observable<any>;
  // soldVehicles: Observable<any>;

  availableVehicles!: number;
  brandCount!: number;
  userCount!: number;
  soldVehicles!: number;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private clientService: ClientService,
    private dataService: DataService
  ) {
    this.carModels = this.dataService.modelos[this.carBrand];
    this.carBrands = this.dataService.marcas;
    // this.availableVehicles = this.clientService.getAvailableVehiclesCount();
    // this.brandCount = this.clientService.getBrandCount();
    // this.userCount = this.clientService.getUserCount();
    // this.soldVehicles = this.clientService.getSoldVehiclesCount();
    // this.sponsoredCars = this.clientService.getSponsoredCars();
  }

  ngOnInit(): void {
    this.clientService.getBrandCount().subscribe(
      (count: number) => {
        this.brandCount = count;
      },
      (error: any) => {
        console.group('In getting brand count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getUserCount().subscribe(
      (count: number) => {
        this.userCount = count;
      },
      (error: any) => {
        console.group('In getting user count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getSoldVehiclesCount().subscribe(
      (count: number) => {
        this.soldVehicles = count;
      },
      (error: any) => {
        console.group('In getting sold vehicles count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getAvailableVehiclesCount().subscribe(
      (count: number) => {
        this.availableVehicles = count;
      },
      (error: any) => {
        console.group('In getting available count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getRecentCars().subscribe(
      (response: AutoSemiNuevo[]) => {
        this.recentCars = response;
      },
      (error: any) => {
        console.log('Error fetching recentCars: ', error);
      }
    );
    this.clientService.getSponsoredCars().subscribe(
      (response: SponsoredCar[]) => {
        console.log('Response Sponsored: ', response);
        this.sponsoredCars = response
          //.sort((a, b) => a.level - b.level)
          .map((elem: SponsoredCar) => elem.autoSemiNuevo);
        console.log(this.sponsoredCars);
      },
      (error: any) => {
        console.log('Error fetching sponsoredCars: ', error);
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

  changeCarBrand(e: any): void {
    const brand: string = e.target.value;
    console.log('Change Car Brand Event: ', e.target.value);
    this.carBrand = brand;
    this.carModels = this.dataService.modelos[this.carBrand];
    //TODO: change this.carBrand and this.carModels
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
    const body: CarSearchFilter = {
      carType: '',
      carSubset: 'USED',
      carBrand: '',
      carModel: '',
      carMaxPrice: 0,
      allCars: true,
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  goToCarSearch(): void {
    const body: CarSearchFilter = {
      carType: '',
      carSubset: 'ALL',
      carBrand: '',
      carModel: '',
      carMaxPrice: 0,
      allCars: true, //! if false, does not apply filters
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  goToCarRegistration(): void {
    if (this.storageService.isLoggedIn()) {
      //TODO: redirect to car-registration
      console.log('redirect to car-registration');
      this.router.navigateByUrl('/dashboard/registrar-carro');
    } else {
      //TODO: register to login/register, then to car-registration
      console.log('register to login/register, then to car-registration');
      this.storageService.setGoingToCarRegistration('yes');
      this.router.navigateByUrl('/registro');
    }
  }

  goToVehicleDetails(carId: number): void {
    this.router.navigate(['/auto-semi-nuevo'], {
      queryParams: {
        id: carId,
      },
    });
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
