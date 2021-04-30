import { Locacion } from './auto-semi-nuevo';

export interface AutoNuevo {
  id: string;
  modelo: string;
  anoFabricacion: string;
  concesionarios: string;
  fotoPrincipal: string;
  documentacion: string;
  precioVenta: number;
  moneda: string;
  locaciones: Locacion[];
  tipoCarroceria: string;
  usoAuto: string[];
  marca: string;
  presentar: boolean;
  version: string;
  codVersion: number;
}

// cosas en comun con AutoSemiNuevo (aunq algunas no tienen el mismo nombre)
// marca
// modelo
// anoFabricacion
// precio
// ciudadesDisponibles
// tipoCarroceria
// ciudadesDisponibles
