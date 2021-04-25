import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutoSemiNuevo } from '../interfaces/auto-semi-nuevo';
import { Denuncia } from '../interfaces/denuncia';
import { User } from '../interfaces/user';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private storageService: StorageService,
    private router: Router
  ) {}

  // * Auth

  public login(body: User): Observable<any> {
    return this.http.post(this.commonService.loginUrl, body);
  }

  //TODO: cambiar a registerRemax y registerParticular
  public register(body: User): Observable<any> {
    return this.http.post(this.commonService.registerUrl, body);
  }

  public getUser(correo: string): Observable<any> {
    return this.http.get(this.commonService.getUserUrl + `?id=${correo}`);
  }

  // * Registro de Carros

  public postAutoSemiNuevo(body: AutoSemiNuevo): Observable<any> {
    return this.http.post(this.commonService.autoSemiNuevoUrl, body);
  }

  // * Car Put

  public putAutoSemiNuevo(body: AutoSemiNuevo): Observable<any> {
    return this.http.put(this.commonService.autoSemiNuevoUrl, body);
  }

  // * Car Getters

  // public getAutosSemiNuevosValidados(pageId: number): Observable<any> {
  //   return this.http.get(this.commonService.getAutosSemiNuevosValidadosUrl + pageId);
  // }

  public getAutosNuevos(): Observable<any> {
    return this.http.get(this.commonService.getAutosNuevosUrl);
  }

  public getAutosInteresantes(correo: string): Observable<any> {
    return this.http.get(
      this.commonService.getAutosInteresantesUrl + `?correo=${correo}`
    );
  }

  public removeAutoFromInteresantes(id: number): Observable<any> {
    return this.http.delete(
      this.commonService.removeAutoFromInteresantesUrl + `?id=${id}`
    );
  }

  public getAutosSemiNuevosValidados(): Observable<any> {
    return this.http.get(this.commonService.getAutosSemiNuevosValidadosUrl);
  }

  public getAutosSemiNuevosValidadosUserUrl(correo: string): Observable<any> {
    return this.http.get(
      this.commonService.getAutosSemiNuevosValidadosUserUrl + `?id=${correo}`
    );
  }

  public getAutoSemiNuevoById(id: number): Observable<any> {
    return this.http.get(this.commonService.autoSemiNuevoUrl + `/${id}`);
  }

  // * Page Count
  public getAutoSemiNuevoPageCount(): Observable<any> {
    return this.http.get(this.commonService.pageCountUrl);
  }

  // * Add Car to Interested in selling
  public addCarToInsterested(body: any): Observable<any> {
    return this.http.post(this.commonService.addCarToInsterestedUrl, body);
  }

  // * To Validate email with form as body
  public validateEmail(body: any): Observable<any> {
    return this.http.put(this.commonService.validateEmailUrl, body);
  }

  public getPlacaDetails(body: any): Observable<any> {
    return this.http.post(this.commonService.getPlacaDetailsUrl, body);
  }

  public getRegistroBalance(id: string): Observable<any> {
    return this.http.get(
      this.commonService.getRegistroBalanceUrl + `?id=${id}`
    );
  }

  public getSolicitudRetiro(id: string): Observable<any> {
    return this.http.get(this.commonService.solicitudRetiroUrl + `?id=${id}`);
  }

  public postSolicitudRetiro(body: any): Observable<any> {
    return this.http.post(this.commonService.solicitudRetiroUrl, body);
  }

  public deleteSolicitudRetiro(id: number): Observable<any> {
    return this.http.delete(
      this.commonService.solicitudRetiroUrl + `?id=${id}`
    );
  }

  // * Denuncias

  public denunciar(body: Denuncia): Observable<any> {
    return this.http.post(this.commonService.denunciaUrl, body);
  }
}
