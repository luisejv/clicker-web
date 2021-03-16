import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { User } from 'src/app/core/interfaces/user';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rol: string;
  isAdmin: boolean;
  isRemax: boolean;
  isUser: boolean;
  user!: User;

  constructor(
    public commonService: CommonService,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.rol = this.storageService.getRoleLocalStorage()!;
    this.isAdmin = this.storageService.getRoleLocalStorage() == RolesEnum.ADMIN;
    this.isRemax = this.storageService.getRoleLocalStorage() == RolesEnum.REMAX;
    this.isUser =
      this.storageService.getRoleLocalStorage() == RolesEnum.PARTICULAR;
    this.userService
      .getUser(this.storageService.getEmailLocalStorage()!)
      .subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.log('Error getting user info: ', error);
          // TODO: handlear esto
        }
      );
  }

  ngOnInit(): void {}

  inDashboard(): boolean {
    return this.router.url.includes('dashboard');
  }
}
