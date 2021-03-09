import { AutoSemiNuevo } from "./auto-semi-nuevo";
import { User } from "./user";

export interface Denuncia {
    id?: number,
    autoSemiNuevo?: AutoSemiNuevo,
    usuario?: User,
    descripcion?: string,
}