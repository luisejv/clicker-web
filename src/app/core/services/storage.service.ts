import { Injectable } from '@angular/core';

enum LocalStorageItem {
  Role = 'role',
  Email = 'email',
  Token = 'token',
  Validated = 'validated',
  Id = 'id',
  Dni = 'dni',
  Nombre = 'nombre',
  Apellidos = 'apellidos',
  Phone = 'Phone',
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setRoleSessionStorage(role: string): void {
    sessionStorage.setItem(LocalStorageItem.Role, role);
  }

  getRoleSessionStorage(): string | null {
    return sessionStorage.getItem(LocalStorageItem.Role);
  }

  removeRoleFromSessionStorage(): void {
    sessionStorage.removeItem(LocalStorageItem.Role);
  }

  setRoleLocalStorage(role: string): void {
    localStorage.setItem(LocalStorageItem.Role, role);
  }

  getRoleLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Role);
  }

  removeRoleFromLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Role);
  }

  setEmailSessionStorage(email: string): void {
    sessionStorage.setItem(LocalStorageItem.Email, email);
  }

  setEmailLocalStorage(email: string): void {
    localStorage.setItem(LocalStorageItem.Email, email);
  }

  getEmailSessionStorage(): string | null {
    return sessionStorage.getItem(LocalStorageItem.Email);
  }

  getEmailLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Email);
  }

  removeEmailSessionStorage(): void {
    sessionStorage.removeItem(LocalStorageItem.Email);
  }

  removeEmailLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Email);
  }

  setTokenLocalStorage(token: string): void {
    localStorage.setItem(LocalStorageItem.Token, token);
  }

  getTokenLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Token);
  }

  removeTokenLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Token);
  }

  setValidatedLocalStorage(validated: string): void {
    localStorage.setItem(LocalStorageItem.Validated, validated);
  }

  getValidatedLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Validated);
  }

  removeValidatedLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Validated);
  }

  isLoggedIn(): boolean {
    return this.getEmailLocalStorage() != null;
  }

  isValidated(): boolean {
    return this.getValidatedLocalStorage() == 'true';
  }

  setIdLocalStorage(id: number): void {
    localStorage.setItem(LocalStorageItem.Id, id.toString());
  }

  getIdLocalStorage(): number | null {
    return Number(localStorage.getItem(LocalStorageItem.Id));
  }

  removeIdLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Id);
  }

  setDniLocalStorage(dni: string): void {
    localStorage.setItem(LocalStorageItem.Dni, dni);
  }

  setNombreLocalStorage(nombre: string): void {
    localStorage.setItem(LocalStorageItem.Nombre, nombre);
  }

  setApellidosLocalStorage(apellidos: string): void {
    localStorage.setItem(LocalStorageItem.Apellidos, apellidos);
  }

  getDniLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Dni);
  }

  getNombreLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Nombre);
  }

  getApellidosLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Apellidos);
  }

  removeDniLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Dni);
  }

  removeNombreLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Nombre);
  }

  removeApellidosLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Apellidos);
  }

  getPhoneLocalStorage(): string | null {
    return localStorage.getItem(LocalStorageItem.Phone);
  }

  setPhoneLocalStorage(phone: string): void {
    localStorage.setItem(LocalStorageItem.Phone, phone);
  }

  removePhoneLocalStorage(): void {
    localStorage.removeItem(LocalStorageItem.Phone);
  }
}
