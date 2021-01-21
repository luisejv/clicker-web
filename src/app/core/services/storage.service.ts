import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setRoleSessionStorage(role: string): void {
    sessionStorage.setItem('role', role);
  }

  getRoleSessionStorage(): string | null {
    return sessionStorage.getItem('role');
  }

  removeRoleFromSessionStorage(): void {
    sessionStorage.removeItem('role');
  }

  setEmailSessionStorage(email: string): void {
    sessionStorage.setItem('email', email);
  }

  getEmailSessionStorage(): string | null {
    return sessionStorage.getItem('email');
  }

  removeEmailSessionStorage(): void {
    sessionStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return this.getEmailSessionStorage() != null;
  }

}
