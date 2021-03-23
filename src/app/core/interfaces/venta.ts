import { AutoSemiNuevo } from "./auto-semi-nuevo";
import { Usuario } from "./usuario";

export interface Venta {
    id?: number,
    autoSemiNuevo: AutoSemiNuevo,
    vendedor?: Usuario | null,
    fecha?: string,
    ciudadCompra: string,
    foto: string,
    comisionGeneral?: number,
    precioFinalVenta?: number,
    gananciaUsuario?: number,
    gananciaVendedor?: number,
    gananciaEmpresa?: number,
}