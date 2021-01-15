import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl: string = environment.baseUrl;

/* User URL Services */
  loginUrl: string = this.baseUrl + '/auth/login';

  constructor() { }
}
