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

  setTokenLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  getTokenLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  removeTokenLocalStorage(): void {
    localStorage.removeItem('token');
  }

  setValidatedLocalStorage(validated: string): void {
    localStorage.setItem('validated', validated);
  }

  getValidatedLocalStorage(): string | null {
    return localStorage.getItem('validated');
  }

  removeValidatedLocalStorage(): void {
    localStorage.removeItem('validated');
  }

  isLoggedIn(): boolean {
    return this.getEmailLocalStorage() != null;
  }

  isValidated(): boolean {
    return this.getValidatedLocalStorage() == 'true';
  }
  
}
