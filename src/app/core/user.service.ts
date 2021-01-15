import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  public login(body: any): Observable<any>{
    return this.http.post(this.commonService.loginUrl, body);
  }
}
