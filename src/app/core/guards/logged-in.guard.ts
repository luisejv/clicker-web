import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role: string | null = this.storageService.getRoleLocalStorage();
      if (role !== null && (role === RolesEnum.ADMIN || role === RolesEnum.PARTICULAR || role === RolesEnum.REMAX || role === RolesEnum.SUPERADMIN)) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
  }
  
}
