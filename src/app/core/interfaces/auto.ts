export interface Auto {
  id: number;
  modelo: string;
  anoFabricacion?: number;
  concesionarios?: string;
  fotoPrincipal?: string;
  documentacion?: string;
  precioVenta?: number;
  moneda?: string;
  locaciones?: string[];
  tipocarroceria?: string;
  usoauto?: string[];
  marca: string;
  presentar?: boolean;
  version?: string;
  codVersion?: string;
  // precioSugerido?: number,
  // cambios?: string,
}
