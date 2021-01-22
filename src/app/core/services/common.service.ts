import { HostListener, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl: string = environment.baseUrl;
  screenHeight: number = 0;
  screenWidth: number = 0;

/* User URL Services */
  // * Auth
  loginUrl: string = this.baseUrl + '/auth/login';
  registerUrl: string = this.baseUrl + '/auth/register';

  // * Car Registrarion
  autoSemiNuevoUrl: string = this.baseUrl + '/post';

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
