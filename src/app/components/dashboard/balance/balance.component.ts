import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestPaymentComponent } from './request/request.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  constructor(private dialogService: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialogService.open(RequestPaymentComponent, {
      width: '300px',
      height: '250px',
    });
  }
}
