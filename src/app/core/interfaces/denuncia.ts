import { Usuario } from "./usuario";

interface AutoSemiNuevoId {
    id: number
}

export interface Denuncia {
    id?: number,
    autoSemiNuevo?: AutoSemiNuevoId,
    usuario?: Usuario,
    descripcion?: string,
}