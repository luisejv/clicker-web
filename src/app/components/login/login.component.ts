import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/storage.service';
import { UserService } from 'src/app/core/user.service';
import { RolesEnum } from 'src/app/core/interfaces/roles.enum';
import { User } from 'src/app/core/model/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logIn(): void{
    const body = {
      correo: this.email,
      password: this.password,
    }
    this.userService.login(body).subscribe(
      (response: User) => {
        if (response) {
          if (response.role == 'admin') {
            this.storageService.setRoleSessionStorage(RolesEnum.ADMIN);
          } else if (response.role == 'superadmin') {
            this.storageService.setRoleSessionStorage(RolesEnum.SUPERADMIN);
          } else {
            this.storageService.setRoleSessionStorage(RolesEnum.USER);
          }
          Swal.fire({
            titleText: 'Logged In!',
            html: 'Logged in succesfully!',
            allowOutsideClick: true,
            icon: 'success',
            showConfirmButton: true,
          }).then(() => {
            if (response.role != 'particular' ) {
              this.router.navigateByUrl('/dashboard');
            } else {
              this.router.navigateByUrl('/home');
            }
          })
        } else {
          Swal.fire({
            titleText: 'Incorrect Username or Password!',
            html: 'Try again please.',
            allowOutsideClick: true,
            icon: 'error',
            showConfirmButton: true
          })
        }
      }
    )
  }

}
