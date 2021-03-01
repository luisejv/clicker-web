import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestPaymentComponent {
  cantidad!: number;
  balance!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<RequestPaymentComponent>,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  requestPayment(): void {
    this.userService
      .getUser(this.storageService.getEmailLocalStorage()!)
      .subscribe(
        (response: User) => {
          this.balance = response.balance!;
          if (this.balance - this.cantidad >= 0) {
            // TODO Withdrawal request here
            /* this.userService.requestPayment() */
            // ? Decirle al usuario que su solicitud fue exitosa
            Swal.fire();
          } else {
            // ? Decirle al usuario que no se puede
            Swal.fire();
          }
        },
        (error: any) => {
          console.error('error getting user: ', error);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
