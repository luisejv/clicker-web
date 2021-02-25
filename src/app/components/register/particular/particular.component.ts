import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { User } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.css'],
})
export class ParticularComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.formGroup = this.fb.group({
      correo: null,
      password: null,
      rol: null,
    });
  }

  ngOnInit(): void {}

  toJSON(): User {
    return {
      correo: this.formGroup.value.correo,
      password: this.formGroup.value.password,
      rol: 'PARTICULAR',
      form: {
        estado: false,
      },
    };
  }

  registerParticular(): void {
    //TODO: añadir spinner
    const body: User = this.toJSON();
    this.userService.register(body).subscribe(
      (response: User) => {
        this.storageService.setRoleLocalStorage(RolesEnum.PARTICULAR);
        this.storageService.setEmailLocalStorage(this.formGroup.value.email);

        Swal.fire({
          titleText: '¡Registrado!',
          html: 'El registro fue exitoso.',
          allowOutsideClick: true,
          icon: 'success',
          showConfirmButton: true,
        }).then(() => {
          //TODO: este if no será necesario cuando implementemos la verificación por mail, solo tendra q estar en el login
          if (this.storageService.getGoingToCarRegistration()) {
            this.storageService.removeGoingToCarRegistration();
            this.router.navigateByUrl('/dashboard/registrar-carro');
          } else {
            //! a /home porq tiene q esperar a ser verificado
            this.router.navigateByUrl('/home');
          }
        });
      },
      (error: any) => {
        console.log(`[ERROR]: Register Particular, ${error}`);
        Swal.fire({
          titleText: 'Error!',
          html: 'Try again please.',
          allowOutsideClick: true,
          icon: 'error',
          showConfirmButton: true,
        });
      }
    );
  }
}
