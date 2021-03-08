import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatedGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.storageService.isValidated()) {
      return true;
    } else {
      this.router.navigate([
        '/validation/' + this.storageService.getTokenLocalStorage(),
      ]);
      return false;
    }
  }
}
