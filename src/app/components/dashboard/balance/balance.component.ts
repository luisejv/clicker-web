import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Balance } from 'src/app/core/interfaces/balance';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { RequestPaymentComponent } from './request/request.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  dataSource!: MatTableDataSource<Balance>;
  columnsToDisplay = ['index', 'date', 'value', 'description'];
  constructor(
    private dialogService: MatDialog,
    private userService: UserService,
    private storageService: StorageService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.userService
      .getRegistroBalance(this.storageService.getIdLocalStorage()!)
      .subscribe(
        (response: Balance[]) => {
          this.dataSource = new MatTableDataSource(response);
        },
        (error: any) => {
          console.log('Error getting balance: ', error);
        }
      );
  }

  openDialog(): void {
    this.dialogService.open(RequestPaymentComponent, {
      width: '300px',
      height: '220px',
    });
  }
}
