import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SponsoredCar } from '../interfaces/auto-semi-nuevo';
import { SponsorUpdate } from '../interfaces/sponsor-update';
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
    return this.http.put(this.commonService.validateAutoUrl + `/${id}`, null);
  }

  public validateAutoReportado(id: number): Observable<any> {
    return this.http.put(
      this.commonService.validateReportedCarUrl + `?id=${id}`,
      null
    );
  }

  public removeSponsoredCar(id: number): Observable<any> {
    return this.http.delete(this.commonService.sponsoredCarsUrl + `?id=${id}`);
  }

  public removeAutoReportado(id: number): Observable<any> {
    return this.http.delete(
      this.commonService.removeReportedCarUrl + `?id=${id}`
    );
  }

  public registrarVenta(body: FormData): Observable<any> {
    return this.http.post(this.commonService.registerSaleUrl, body);
  }

  public getSolicitudesRetiro(): Observable<any> {
    return this.http.get(this.commonService.getSolicitudesRetiroUrl);
  }

  //TODO: solicitud retiro interface
  public validateSolicitudRetiro(body: any): Observable<any> {
    return this.http.put(this.commonService.putSolicitudesRetiroUrl, body);
  }

  public getCarrosInteresados(): Observable<any> {
    return this.http.get(this.commonService.carrosInteresadosUrl);
  }

  public putSponsoredCarLevel(body: SponsorUpdate): Observable<any> {
    return this.http.put(this.commonService.sponsoredCarsUrl, body);
  }

  public addCarToSponsored(body: SponsoredCar): Observable<any> {
    return this.http.post(this.commonService.sponsoredCarsUrl, body);
  }

  public getBanner(): Observable<any> {
    return this.http.get(this.commonService.bannerUrl);
  }

  public postBanner(formData: FormData): Observable<any> {
    return this.http.post(this.commonService.bannerUrl, formData);
  }
}
