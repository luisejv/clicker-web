import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { User } from 'src/app/core/interfaces/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('\\w{2,}')]],
    });
  }

  ngOnInit(): void {}

  logIn(): void {
    //TODO: añadir spinner
    const body: User = {
      correo: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };
    console.log(`BODY: ${body}`);
    this.userService.login(body).subscribe(
      (response: User) => {
        if (response.rol == 'ADMIN') {
          this.storageService.setRoleSessionStorage(RolesEnum.ADMIN);
        } else if (response.rol == 'SUPERADMIN') {
          this.storageService.setRoleSessionStorage(RolesEnum.SUPERADMIN);
        } else if (response.rol == 'PARTICULAR') {
          this.storageService.setRoleSessionStorage(RolesEnum.PARTICULAR);
        } else {
          this.storageService.setRoleSessionStorage(RolesEnum.REMAX);
        }

        this.storageService.setEmailSessionStorage(this.formGroup.value.email);

        Swal.fire({
          titleText: 'Logged In!',
          html: 'Loggeado correctamente!',
          allowOutsideClick: true,
          icon: 'success',
          showConfirmButton: true,
        }).then(() => {
          if (response.rol != 'PARTICULAR') {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/home');
          }
        });
      },
      (error: any) => {
        console.log(`[ERROR]: Login, ${error}`);
        Swal.fire({
          titleText: 'Incorrect Username or Password!',
          html: 'Try again please.',
          allowOutsideClick: true,
          icon: 'error',
          showConfirmButton: true,
        });
      }
    );
  }
}
