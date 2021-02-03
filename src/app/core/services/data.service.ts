import { Injectable } from '@angular/core';
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

  marcas: string[] = ['Tesla', 'Kia', 'Opel', 'BMW'];

  modelos: any = {
    Tesla: ['Model X', 'Model Y', 'Model S', 'Roadster'],
    Kia: ['Optima', 'Sportage', 'Sorento', 'Elantra'],
    Opel: ['Opel 1', 'Opel 2', 'Opel 3'],
    BMW: ['2-Series', '3-Series', '5-Series', '7-Series', '8-Series'],
  };

  autos: any[] = [
    {
      marca: 'Tesla',
      modelos: ['Model X', 'Model Y', 'Model S', 'Roadster'],
    },
    {
      marca: 'Kia',
      modelos: ['Optima', 'Sportage', 'Sorento', 'Elantra'],
    },
    {
      marca: 'Opel',
      modelos: ['Opel 1', 'Opel 2', 'Opel 3'],
    },
    {
      marca: 'BMW',
      modelos: ['2-Series', '3-Series', '5-Series', '7-Series', '8-Series'],
    },
  ];

  constructor(private userService: UserService) {}
}
