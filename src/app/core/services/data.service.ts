import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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

  constructor() { 
    // TODO: hacer los requests de las tablas utilitarias
  }
}
