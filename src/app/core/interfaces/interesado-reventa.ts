import { AutoSemiNuevo } from "./auto-semi-nuevo";
import { User } from "./user";

export interface InteresadoReventa {
    id: number,
    autoSemiNuevo: AutoSemiNuevo,
    usuario: User,
}