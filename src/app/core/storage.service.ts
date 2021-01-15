import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setRoleSessionStorage(role: string) {
    sessionStorage.setItem('role', role);
  }

  getRoleSessionStorage(): string | null {
    return sessionStorage.getItem('role');
  }

  removeRoleFromSessionStorage() {
    sessionStorage.removeItem('role');
  }
}
