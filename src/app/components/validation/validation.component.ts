import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  encryptedId!: string;
  validated: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {}

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
            this.storageService.setValidatedLocalStorage('true');
            this.router.navigateByUrl('/dashboard');
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
