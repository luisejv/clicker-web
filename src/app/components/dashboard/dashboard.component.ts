import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rol: string;
  balance: number;
  isAdmin: boolean;
  isRemax: boolean;
  isUser: boolean;

  constructor(
    public commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    // ! cuidado con el '!'
    this.rol = this.storageService.getRoleLocalStorage()!;
    this.isAdmin = this.storageService.getRoleLocalStorage() == RolesEnum.ADMIN;
    this.isRemax = this.storageService.getRoleLocalStorage() == RolesEnum.REMAX;
    this.isUser =
      this.storageService.getRoleLocalStorage() == RolesEnum.PARTICULAR;
    this.balance = 100;
  }

  ngOnInit(): void {}

  inDashboard(): boolean {
    return this.router.url.includes('dashboard');
  }
}
