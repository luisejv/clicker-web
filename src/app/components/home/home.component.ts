import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
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

  recentCars: Car[];
  sponsoredCars: Car[];

  constructor(private router: Router) {
    // TODO: hacer el request de recent cars aqui
    // TODO: hacer el request de sponsored aqui
    this.recentCars = TEST_CARS;
    this.sponsoredCars = SPONSOR_TEST;
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

  toListings(): void {
    this.router.navigate(['/inventory-listings'], {
      state: { carType: 'usados' },
    });
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
    fotoPrincipal: 'assets/media/content/b-goods/slider/1.png',
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
    fotoPrincipal: 'assets/media/content/b-goods/slider/2.png',
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
    fotoPrincipal: 'assets/media/content/b-goods/slider/1.png',
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
    fotoPrincipal: 'assets/media/content/b-goods/slider/2.png',
  },
];
