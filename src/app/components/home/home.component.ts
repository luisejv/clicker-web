import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
declare var $: any;

interface Car {
  usuario?: {
    correo: string;
  };
  placa?: string;
  serie?: string;
  correoDueno?: string;
  nombreDueno?: string;
  telefonoDueno?: string;
  marca?: string;
  modelo?: string;
  anoFabricacion?: string;
  tipoCambios?: string;
  tipoCombustible?: string;
  tipoCarroceria?: string;
  cilindrada?: number;
  kilometraje: number;
  numeroPuertas?: number;
  tipoTraccion?: string;
  color?: string;
  numeroCilindros?: number;
  precioVenta?: number;
  comprado?: boolean;
  validado?: boolean;
  enabled?: boolean;
  comisionUsuario?: number;
  comisionVendedor?: number;
  comisionEmpresa?: number;
  fechaPublicacion?: string;
  video?: string;
  accesorios?: string[];
  fotoPrincipal?: string;
  fotos?: Foto[];
  locaciones?: Locacion;
}

interface Foto {
  foto: string;
}

interface Locacion {
  id: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}

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

  recentCars: Car[];
  sponsoredCars: Car[];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private dataService: DataService
  ) {
    // TODO: hacer el request de recent cars aqui
    // TODO: hacer el request de sponsored aqui
    this.recentCars = TEST_CARS;
    this.sponsoredCars = SPONSOR_TEST;
    this.carModels = this.dataService.modelos[this.carBrand];
    this.carBrands = this.dataService.marcas;
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

const TEST_CARS: Car[] = [
  {
    marca: 'Toyota',
    modelo: 'Yaris',
    anoFabricacion: '2019',
    tipoCambios: 'Mecánico',
    locaciones: {
      id: '1',
      departamento: 'Lima',
    },
    kilometraje: 360000,
    tipoCombustible: 'Gasolina',
    precioVenta: 45000,
    fotoPrincipal: 'assets/media/content/b-goods/263x200/1.jpg',
  },
  {
    marca: 'Kia',
    modelo: 'Rio',
    anoFabricacion: '2021',
    tipoCambios: 'Automático',
    locaciones: {
      id: '10',
      departamento: 'Chiclayo',
    },
    kilometraje: 260000,
    tipoCombustible: 'Petróleo',
    precioVenta: 40000,
    fotoPrincipal: 'assets/media/content/b-goods/263x200/2.jpg',
  },
];

const SPONSOR_TEST: Car[] = [
  {
    marca: 'Toyota',
    modelo: 'Yaris',
    anoFabricacion: '2019',
    tipoCambios: 'Mecánico',
    locaciones: {
      id: '1',
      departamento: 'Lima',
    },
    kilometraje: 360000,
    tipoCombustible: 'Gasolina',
    precioVenta: 45000,
    fotoPrincipal: 'assets/media/content/b-goods/263x200/1.jpg',
  },
  {
    marca: 'Kia',
    modelo: 'Rio',
    anoFabricacion: '2021',
    tipoCambios: 'Automático',
    locaciones: {
      id: '10',
      departamento: 'Chiclayo',
    },
    kilometraje: 260000,
    tipoCombustible: 'Petróleo',
    precioVenta: 40000,
    fotoPrincipal: 'assets/media/content/b-goods/263x200/2.jpg',
  },
  {
    marca: 'Toyota',
    modelo: 'Yaris',
    anoFabricacion: '2019',
    tipoCambios: 'Mecánico',
    locaciones: {
      id: '1',
      departamento: 'Lima',
    },
    kilometraje: 360000,
    tipoCombustible: 'Gasolina',
    precioVenta: 45000,
    fotoPrincipal: 'assets/media/content/b-goods/263x200/1.jpg',
  },
  {
    marca: 'Kia',
    modelo: 'Rio',
    anoFabricacion: '2021',
    tipoCambios: 'Automático',
    locaciones: {
      id: '10',
      departamento: 'Chiclayo',
    },
    kilometraje: 260000,
    tipoCombustible: 'Petróleo',
    precioVenta: 40000,
    fotoPrincipal: 'assets/media/content/b-goods/263x200/2.jpg',
  },
];
