import { Auto } from "./auto";
import { User } from "./user";

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
    usuario: User,
}
