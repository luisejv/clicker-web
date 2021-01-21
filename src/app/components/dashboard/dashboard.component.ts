import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  inDashboard(): boolean {
    return this.router.url.includes('dashboard');
  }

}
