export interface User {
    correo: string,
    password: string, //TODO: quitarlo cuando cesar lo quite
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
    carrosPosteados?: Object[], //TODO: interface AutoSemiNuevo creo, pero con más propiedades
    denuncias?: Object[], //TODO: interface denuncia
    interesado?: Object[], //TODO: interface interesado
}
