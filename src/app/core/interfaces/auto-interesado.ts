import { AutoSemiNuevo } from "./auto-semi-nuevo";
import { InteresadoCompra } from "./interesado-compra";
import { InteresadoReventa } from "./interesado-reventa";

export interface AutoInteresado {
    auto: AutoSemiNuevo,
    interesadosReventa: InteresadoReventa,
    interesadosCompra: InteresadoCompra,
}