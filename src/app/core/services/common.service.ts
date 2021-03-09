import { HostListener, Injectable } from '@angular/core';
import { threadId } from 'worker_threads';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private baseUrl: string = environment.baseUrl;
  private consultaPlacaUrl: string =
    'http://ws-consultas.herokuapp.com/api/placa';
  screenHeight: number = 0;
  screenWidth: number = 0;

  /* User URL Services */
  // * Auth
  loginUrl: string = this.baseUrl + '/auth/login';
  registerUrl: string = this.baseUrl + '/auth/register';
  validateEmailUrl: string = this.baseUrl + '/user/validate';

  // * User
  userUrl: string = this.baseUrl + '/user';
  getUserUrl: string = this.userUrl + '/id';

  // * Car Registrarion
  autoSemiNuevoUrl: string = this.baseUrl + '/post';

  // * Car Get
  getAutosSemiNuevosValidadosUrl: string = this.autoSemiNuevoUrl + '/enabled';
  getSponsoredCarsUrl: string = this.baseUrl + '/sponsor';
  getRecentCarsUrl: string = this.baseUrl + '/post/enabled/0';
  getAutosNoValidadosUrl: string = this.autoSemiNuevoUrl + '/novalidados';
  getAutosReportadosUrl: string = this.autoSemiNuevoUrl + '/reported';

  // * Car Put
  validateAutoUrl: string = this.autoSemiNuevoUrl + '/validate';

  // * Posted Cars By User
  getAutosSemiNuevosValidadosUserUrl: string = this.userUrl + '/id';

  // * Car Pages Count
  pageCountUrl: string = this.autoSemiNuevoUrl + '/enabled/count';

  // * Useful Info
  brandCountUrl: string = this.autoSemiNuevoUrl + '/marcas';
  userCountUrl: string = this.userUrl + '/number';
  availableVehiclesCountUrl: string = this.autoSemiNuevoUrl + '/novendidos';
  soldVehiclesCountUrl: string = this.autoSemiNuevoUrl + '/vendidos';
  filtersUrl: string = this.baseUrl + '/post/filtros';

  // * Interested in Car
  postFormInterestedUrl: string = this.autoSemiNuevoUrl + '/interesadosCompra';
  addCarToInsteredUrl: string = this.autoSemiNuevoUrl + '/interesadosVenta';

  // * Ubigeos
  ubigeosUrl: string = this.baseUrl + '/locaciones';

  // * Placa Service
  getPlacaDetailsUrl: string = this.consultaPlacaUrl;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // console.log("window resize");
  }

  constructor() {
    this.getScreenSize();
  }
}
