import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  id!: number;
  encryptedId!: string;
  correo: string;
  validated: boolean = false;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private router: Router,
    private storageService: StorageService,
    private location: Location
  ) {
    this.correo = this.storageService.getEmailLocalStorage()!;
    this.id = this.storageService.getIdLocalStorage()!;
  }

  ngOnInit(): void {
    // if (this.encryptedId != this.storageService.getTokenLocalStorage()) {
    //   this.router.navigate(['/home']);
    // }
    this.encryptedId = this.router.url.split('validation/')[1];
    console.log(this.encryptedId);
    if (this.encryptedId != '0') {
      const body = {
        correo: this.encryptedId,
      };
      this.userService.validateEmail(body).subscribe(
        (response) => {
          this.validated = true;
          Swal.fire({
            title: 'Validado correctamente!',
            html: 'Tu cuenta ha sido validada con éxito',
            allowOutsideClick: true,
            icon: 'success',
            showConfirmButton: true,
          }).then(() => {
            if (this.storageService.isLoggedIn()) {
              this.storageService.setValidatedLocalStorage('true');
              this.router.navigateByUrl('/dashboard');
            } else {
              this.router.navigateByUrl('/login');
            }
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  resendEmail(): void {
    console.log('resend email');

    this.clientService.resendEmail(this.id).subscribe(
      (res: any) => {
        console.group('Resend email response');
        console.log(res);
        console.groupEnd();
        Swal.fire({
          icon: 'success',
          title: '¡Reenviado!',
          html: 'Revisa tu correo y no olvides revisar SPAM.',
        });
      },
      (err: HttpErrorResponse) => {
        console.group('Resend email error');
        console.log(err);
        console.groupEnd();
        Swal.fire({
          icon: 'error',
          title: 'Ocurió un error!',
          html: 'Inténtalo de nuevo más tarde.',
        });
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
