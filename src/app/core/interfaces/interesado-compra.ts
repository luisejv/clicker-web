import { AutoSemiNuevo } from "./auto-semi-nuevo";

export interface InteresadoCompra {
    id: number,
    autoSemiNuevo: AutoSemiNuevo,
    nombre: string,
    numTelefono: number,
    correo: string,
    descripcion: string,
}