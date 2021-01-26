import { Auto } from "./auto";
import { Usuario } from "./usuario";

export interface AutoSemiNuevo {
    auto: Auto,
    precioVenta: number,
    moneda: string,
    codversion: number,
    version: string,
    ciudadesDisponibles: string[],
    kilometraje: number,
    tipoAuto: string,
    presentar: boolean,
    duenoCarro: boolean,
    usuario: Usuario,
}
