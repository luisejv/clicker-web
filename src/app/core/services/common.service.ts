import { HostListener, Injectable } from '@angular/core';
import { threadId } from 'worker_threads';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private baseUrl: string = environment.baseUrl;
  screenHeight: number = 0;
  screenWidth: number = 0;

  /* User URL Services */
  // * Auth
  loginUrl: string = this.baseUrl + '/auth/login';
  registerUrl: string = this.baseUrl + '/auth/register';

  // * User
  userUrl: string = this.baseUrl + '/user';

  // * Car Registrarion
  autoSemiNuevoUrl: string = this.baseUrl + '/post';

  // * Car Getter
  getAutosSemiNuevosValidadosUrl: string = this.autoSemiNuevoUrl + '/enabled';
  getSponsoredCarsUrl: string = this.baseUrl + '/sponsor';
  getRecentCarsUrl: string = this.baseUrl + '/post/enabled/0';

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
