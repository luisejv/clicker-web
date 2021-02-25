import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
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

  setRoleLocalStorage(role: string): void {
    localStorage.setItem('role', role);
  }

  getRoleLocalStorage(): string | null {
    return localStorage.getItem('role');
  }

  removeRoleFromLocalStorage(): void {
    localStorage.removeItem('role');
  }

  setEmailSessionStorage(email: string): void {
    sessionStorage.setItem('email', email);
  }

  setEmailLocalStorage(email: string): void {
    localStorage.setItem('email', email);
  }

  getEmailSessionStorage(): string | null {
    return sessionStorage.getItem('email');
  }

  getEmailLocalStorage(): string | null {
    return localStorage.getItem('email');
  }

  removeEmailSessionStorage(): void {
    sessionStorage.removeItem('email');
  }

  removeEmailLocalStorage(): void {
    localStorage.removeItem('email');
  }

  setGoingToCarRegistration(yesOrNo: string): void {
    sessionStorage.setItem('goingToCarRegistration', yesOrNo);
  }

  getGoingToCarRegistration(): boolean {
    return sessionStorage.getItem('goingToCarRegistration') === 'yes'
      ? true
      : false;
  }

  removeGoingToCarRegistration(): void {
    sessionStorage.removeItem('goingToCarRegistration');
  }

  isLoggedIn(): boolean {
    return this.getEmailSessionStorage() != null;
  }
}
