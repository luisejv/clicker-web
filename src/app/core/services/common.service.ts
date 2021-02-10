import { HostListener, Injectable } from '@angular/core';
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
