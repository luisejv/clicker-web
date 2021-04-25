import { AutoSemiNuevo } from './auto-semi-nuevo';

export interface InteresadoCompra {
  id: number;
  autoSemiNuevo: AutoSemiNuevo;
  nombres: string;
  apellidos: string;
  dni: string;
  numTelefono: number;
  correo: string;
  descripcion: string;
}
