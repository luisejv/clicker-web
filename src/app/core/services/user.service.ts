import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutoSemiNuevo } from '../interfaces/auto-semi-nuevo';
import { User } from '../interfaces/user';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  // * Auth

  public login(body: User): Observable<any> {
    return this.http.post(this.commonService.loginUrl, body);
  }

  //TODO: cambiar a registerRemax y registerParticular
  public register(body: User): Observable<any> {
    return this.http.post(this.commonService.registerUrl, body);
  }

  // * Registro de Carros

  public postAutoSemiNuevo(body: AutoSemiNuevo): Observable<any> {
    return this.http.post(this.commonService.autoSemiNuevoUrl, body);
  }

  // * Car Getters

  public getAutosSemiNuevosValidados(pageId: number): Observable<any> {
    return this.http.get(this.commonService.getAutosSemiNuevosValidadosUrl + pageId);
  }

  // * Page Count
  public getAutoSemiNuevoPageCount(): Observable<any> {
    return this.http.get(this.commonService.pageCountUrl);
  }

}
