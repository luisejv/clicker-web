import { AutoSemiNuevo } from "./auto-semi-nuevo";

export interface User {
    correo: string,
    password?: string, //TODO: quitarlo cuando cesar lo quite
    rol?: string,
    fbId?: string,
    nombre?: string,
    apellidos?: string,
    imagenPerfil?: string,
    numTelefono?: any,
    tipoLicencia?: any,
    tiempoLicencia?: any,
    trabajoAplicativo?: any,
    tipoDocumento?: any,
    numDocumento?: number,
    enabled?: boolean,
    balance?: number,
    cantidadCarrosAno?: number,
    carrosPosteados?: AutoSemiNuevo[],
    denuncias?: any[], //TODO: interface denuncia
    interesadosReventas?: any[], //TODO: interface interesado
    solicitudesRetiros?: any[],
    solicitudesRetiro?: any[],
    formRemax?: any,
}
