import { EventEmitter, HostListener, Injectable } from '@angular/core';
import { threadId } from 'worker_threads';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private baseUrl: string = environment.baseUrl;
  private consultaPlacaUrl: string =
    'https://ws-consultas.herokuapp.com/api/placa';
  changeLayoutEvent = new EventEmitter<void>();

  screenHeight: number = 0;
  screenWidth: number = 0;

  /* User URL Services */
  // * Auth
  loginUrl: string = this.baseUrl + '/auth/login';
  registerUrl: string = this.baseUrl + '/auth/register';
  validateEmailUrl: string = this.baseUrl + '/user/validate';

  // * Car Registrarion
  autoSemiNuevoUrl: string = this.baseUrl + '/post';

  // * Admin
  adminUrl: string = this.baseUrl + '/admin';
  validateReportedCarUrl: string = this.adminUrl + '/reported';
  removeReportedCarUrl: string = this.adminUrl + '/reported';
  carrosInteresadosUrl: string = this.adminUrl + '/interesados';
  registerSaleUrl: string = this.autoSemiNuevoUrl + '/venta';

  // * User
  userUrl: string = this.baseUrl + '/user';
  getUserUrl: string = this.userUrl + '/id';

  // * Car Get
  getAutosSemiNuevosValidadosUrl: string = this.autoSemiNuevoUrl + '/enabled';
  getSponsoredCarsUrl: string = this.baseUrl + '/sponsor';
  getRecentCarsUrl: string = this.baseUrl + '/post/enabled/0';
  getAutosNoValidadosUrl: string = this.autoSemiNuevoUrl + '/novalidados';
  getAutosReportadosUrl: string = this.adminUrl + '/reported';
  getAutosInteresantesUrl: string = this.userUrl + '/interesadoVenta';
  getAutosNuevosUrl: string = this.autoSemiNuevoUrl + '/nuevo';

  // * Car Put
  validateAutoUrl: string = this.autoSemiNuevoUrl + '/validate';
  removeAutoFromInteresantesUrl: string = this.userUrl + '/interesadoVenta';

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
  postFormInterestedUrl: string = this.autoSemiNuevoUrl + '/interesadoCompra';
  addCarToInsterestedUrl: string = this.autoSemiNuevoUrl + '/interesadoVenta';

  // * Ubigeos
  ubigeosUrl: string = this.baseUrl + '/locaciones';

  // * Placa Service
  getPlacaDetailsUrl: string = this.consultaPlacaUrl;

  // * Balance & Retiros
  getRegistroBalanceUrl: string = this.userUrl + '/registroBalance';
  solicitudRetiroUrl: string = this.baseUrl + '/solicitudRetiro';
  getSolicitudesRetiroUrl: string = this.adminUrl + '/Retiros';
  putSolicitudesRetiroUrl: string = this.adminUrl + '/Retiros';

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1060) {
      this.changeLayoutEvent.emit();
    }
  }

  constructor(private storageService: StorageService) {
    this.getScreenSize();
  }
}
