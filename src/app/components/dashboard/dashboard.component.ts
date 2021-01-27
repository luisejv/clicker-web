import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rol: string;

  constructor(
    public commonService: CommonService,
    private router: Router,
    private storageService: StorageService,
  ) {
    // ! cuidado con el '!'
    this.rol = this.storageService.getRoleSessionStorage()!;
  }

  ngOnInit(): void {
  }

  inDashboard(): boolean {
    return this.router.url.includes('dashboard');
  }

}
