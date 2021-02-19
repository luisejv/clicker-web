import { Injectable } from '@angular/core';
import { AutoSemiNuevo } from '../interfaces/auto-semi-nuevo';
import { Filter } from '../interfaces/client';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  monedas: string[] = ['PEN', 'USD', 'EUR'];
  tiposDeCarro: string[] = ['Nuevo', 'De Segunda'];
  ciudades: string[] = [
    'Lima',
    'Huancayo',
    'Ayacucho',
    'Iquitos',
    'Chiclayo',
    'Casma',
    'Mollendo',
    'Callao',
    'Ica',
    'Pisco',
    'Pucallpa',
    'Jauja',
    'Puno',
    'Churín',
    'Tarma',
    'La Oroya',
    'Arequipa',
  ];

  carros: Object[] = [
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 12000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 10000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 12000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 50000,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 12000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 5000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 9800,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 3000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 2500,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 43200,
    },
    {
      name: 'Bentley Continental GT',
      photo: 'assets/media/content/b-goods/270x180/1.jpg',
      price: 12000,
    },
    {
      name: 'Jaguar GX 480i',
      photo: 'assets/media/content/b-goods/270x180/2.jpg',
      price: 7800,
    },
  ];

  marcas: string[] = ['TOYOTA', 'Tesla', 'Kia', 'Opel', 'BMW'];

  modelos: any = {
    Toyota: ['YARIS', 'COROLLA', 'RAV4', 'SEQUOIA'],
    Tesla: ['MODEL X', 'MODEL Y', 'MODEL S', 'ROADSTER'],
    Kia: ['RIO', 'OPTIMA', 'SPORTAGE', 'SORENTO', 'ELANTRA'],
    Opel: ['OPEL 1', 'OPEL 2', 'OPEL 3'],
    BMW: ['2-SERIES', '3-SERIES', '5-SERIES', '7-SERIES', '8-SERIES'],
  };

  autos: any[] = [
    {
      marca: 'TOYOTA',
      modelos: ['YARIS', 'COROLLA', 'RAV4', 'SEQUOIA'],
    },
    {
      marca: 'Tesla',
      modelos: ['MODEL X', 'MODEL Y', 'MODEL S', 'ROADSTER'],
    },
    {
      marca: 'Kia',
      modelos: ['RIO', 'OPTIMA', 'SPORTAGE', 'SORENTO', 'ELANTRA'],
    },
    {
      marca: 'Opel',
      modelos: ['OPEL 1', 'OPEL 2', 'OPEL 3'],
    },
    {
      marca: 'BMW',
      modelos: ['2-SERIES', '3-SERIES', '5-SERIES', '7-SERIES', '8-SERIES'],
    },
  ];

  tiposTransmision: string[] = ['Mecánico', 'Automático'];

  tiposCombustible: string[] = ['Diesel', 'Gasolina', 'GLP', 'GNV'];

  tiposCarroceria: string[] = [
    'SUV',
    'Van',
    'Sedan',
    'Coupe',
    'Pickup',
    'Convertible',
    'Citycar',
  ];

  anos: number[] = [
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
  ];

  /* filtros: Filter[] = [
    {
      marca: 'Toyota',
      modelo: 'Corolla',
      tipoCarroceria: 'SUV',
    },
    {
      marca: 'Toyota',
      modelo: 'Yaris',
      tipoCarroceria: 'CITYCAR',
    },
    {
      marca: 'Toyota',
      modelo: 'Hilux',
      tipoCarroceria: 'PICKUP',
    },
    {
      marca: 'Toyota',
      modelo: 'Corolla',
      tipoCarroceria: 'SUV',
    },
    {
      marca: 'Toyota',
      modelo: 'Avanza',
      tipoCarroceria: 'COUPE',
    },
    {
      marca: 'Toyota',
      modelo: 'Etios',
      tipoCarroceria: 'CITYCAR',
    },
    {
      marca: 'Hyundai',
      modelo: 'Tucson',
      tipoCarroceria: 'SUV',
    },
    {
      marca: 'Hyundai',
      modelo: 'Verna',
      tipoCarroceria: 'SEDAN',
    },
    {
      marca: 'Hyundai',
      modelo: 'Accent',
      tipoCarroceria: 'SEDAN',
    },
    {
      marca: 'Hyundai',
      modelo: 'Elantra',
      tipoCarroceria: 'COUPE',
    },
    {
      marca: 'Hyundai',
      modelo: 'Ioniq',
      tipoCarroceria: 'CITYCAR',
    },
  ]; */

  constructor(private userService: UserService) {}
}
