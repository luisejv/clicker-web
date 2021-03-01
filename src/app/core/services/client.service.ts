import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  public getSponsoredCars(): Observable<any> {
    return this.http.get(this.commonService.getSponsoredCarsUrl);
  }
  public getRecentCars(): Observable<any> {
    return this.http.get(this.commonService.getRecentCarsUrl);
  }
  public getBrandCount(): Observable<any> {
    return this.http.get(this.commonService.brandCountUrl);
  }
  public getAvailableVehiclesCount(): Observable<any> {
    return this.http.get(this.commonService.availableVehiclesCountUrl);
  }
  public getSoldVehiclesCount(): Observable<any> {
    return this.http.get(this.commonService.soldVehiclesCountUrl);
  }
  public getUserCount(): Observable<any> {
    return this.http.get(this.commonService.userCountUrl);
  }
  public getFilters(): Observable<any> {
    return this.http.get(this.commonService.filtersUrl);
  }
  public postFormInterested(body: any): void {
    this.http.post(this.commonService.postFormInterestedUrl, body);
  }
  public getUbigeos(): Observable<any> {
    return this.http.get(this.commonService.ubigeosUrl);
  }
}
