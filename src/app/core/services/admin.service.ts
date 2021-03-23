import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  public getAutosNoValidados(): Observable<any> {
    return this.http.get(this.commonService.getAutosNoValidadosUrl);
  }

  public getAutosReportados(): Observable<any> {
    return this.http.get(this.commonService.getAutosReportadosUrl);
  }

  public validateAutoSemiNuevoById(id: number): Observable<any> {
    return this.http.put(this.commonService.validateAutoUrl + `${id}`, null);
  }

  public validateAutoReportado(id: number): Observable<any> {
    return this.http.put(
      this.commonService.validateReportedCarUrl + `?id=${id}`,
      null
    );
  }

  public removeAutoReportado(id: number): Observable<any> {
    return this.http.delete(
      this.commonService.removeReportedCarUrl + `?id=${id}`
    );
  }

  public registrarVenta(body: Venta): Observable<any> {
    return this.http.post(this.commonService.registerSaleUrl, body);
  }

  public getSolicitudesRetiro(): Observable<any> {
    return this.http.get(this.commonService.getSolicitudesRetiroUrl);
  }

  public validateSolicitudRetiro(body: any): Observable<any> {
    return this.http.put(this.commonService.putSolicitudesRetiroUrl, body);
  }

  public getCarrosInteresados(): Observable<any> {
    return this.http.get(this.commonService.carrosInteresadosUrl);
  }

}
