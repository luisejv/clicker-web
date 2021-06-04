import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { User } from 'src/app/core/interfaces/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerParticularForm: FormGroup;
  loading: boolean = false;
  registerOption: string = 'particular';
  fetchingDNI: boolean = false;
  dniTries: number = 0;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private storageService: StorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('\\w{2,}')]],
      terms: [false],
    });
    this.registerParticularForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      correo: ['', [Validators.required, Validators.email]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      password: ['', [Validators.required]],
      terms: [false, [Validators.required]],
      rol: null,
    });
    this.registerParticularForm.controls['nombres'].disable();
    this.registerParticularForm.controls['apellidos'].disable();
  }

  ngOnInit(): void {}

  toJSON(): User {
    return {
      numDocumento: this.registerParticularForm.value.dni,
      nombre: this.registerParticularForm.value.nombres,
      apellidos: this.registerParticularForm.value.apellidos,
      correo: this.registerParticularForm.value.correo,
      password: this.registerParticularForm.value.password,
      rol: 'PARTICULAR',
      form: {
        estado: false,
      },
    };
  }

  checkDNI() {
    if (this.registerParticularForm.value.dni.length == 8) {
      this.fetchingDNI = true;
      this.clientService
        .getDNIDetails(this.registerParticularForm.value.dni)
        .subscribe(
          (response) => {
            this.fetchingDNI = false;
            this.registerParticularForm.controls['nombres'].setValue(
              response.nombres
            );
            this.registerParticularForm.controls['apellidos'].setValue(
              response.apellido_p + ' ' + response.apellido_m
            );
            this.registerParticularForm.controls['correo'].setValue('');
            this.registerParticularForm.controls['password'].setValue('');
            this.registerParticularForm.controls['terms'].setValue(false);
          },
          (error) => {
            console.log(`[ERROR]: Check DNI, ${error}`);
            Swal.fire({
              titleText: 'DNI incorrecto, por favor intente de nuevo.',
              html: 'Try again please.',
              allowOutsideClick: true,
              icon: 'error',
              showConfirmButton: true,
            });
            this.fetchingDNI = false;
            this.dniTries = this.dniTries + 1;
            if (this.dniTries == 2) {
              this.registerParticularForm.controls['nombres'].enable();
              this.registerParticularForm.controls['apellidos'].enable();
            }
          }
        );
    } else {
      Swal.fire({
        titleText: 'Error!',
        html: 'Primero debes ingresar un DNI.',
        allowOutsideClick: true,
        icon: 'warning',
        showConfirmButton: true,
      });
    }
  }

  changeRegisterOption(option: string): void {
    this.registerOption = option;
  }

  logIn(): void {
    //TODO: añadir spinner
    const body: User = {
      correo: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log(`BODY: ${body}`);
    this.userService.login(body).subscribe(
      (response: any) => {
        console.log('response login: ', response);
        // TODO: adecuar cuando se tenga form de remax
        if (response.rol == 'ADMIN') {
          this.storageService.setRoleLocalStorage(RolesEnum.ADMIN);
        } else if (response.rol == 'SUPERADMIN') {
          this.storageService.setRoleLocalStorage(RolesEnum.SUPERADMIN);
        } else if (response.rol == 'REMAX') {
          this.storageService.setRoleLocalStorage(RolesEnum.REMAX);
          this.storageService.setTokenLocalStorage(response.secret);
          this.storageService.setValidatedLocalStorage(response.validated);
        } else {
          this.storageService.setRoleLocalStorage(RolesEnum.PARTICULAR);
          this.storageService.setTokenLocalStorage(response.secret);
          this.storageService.setValidatedLocalStorage(response.validated);
          this.storageService.setIdLocalStorage(response.id);
        }
        this.storageService.setIdLocalStorage(response.id);
        this.storageService.setEmailLocalStorage(this.loginForm.value.email);
        this.storageService.setDniLocalStorage(response.numDocumento);
        this.storageService.setNombreLocalStorage(response.nombre);
        this.storageService.setApellidosLocalStorage(response.apellidos); //NOTE: no hay apellidos
        this.storageService.setPhoneLocalStorage(response.numTelefono);

        Swal.fire({
          titleText: 'Logged In!',
          html: 'Loggeado correctamente!',
          allowOutsideClick: true,
          icon: 'success',
          showConfirmButton: true,
        }).then(() => {
          this.router.navigateByUrl('/dashboard');
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

  registerParticular(): void {
    //TODO: añadir spinner
    if (this.registerParticularForm.value.terms === true) {
      const body: User = this.toJSON();
      this.userService.register(body).subscribe(
        (response: User) => {
          Swal.fire({
            titleText: '¡Registrado!',
            html: 'El registro fue exitoso. Por favor verifique su cuenta a través del email que le hemos enviado a su bandeja de entrada. <b>No olvide revisar SPAM</b>',
            allowOutsideClick: true,
            icon: 'success',
            showConfirmButton: true,
          }).then(() => {
            this.router.navigateByUrl('/home');
          });
        },
        (error: any) => {
          console.log(`[ERROR]: Register Particular, ${error}`);
          Swal.fire({
            titleText: 'Oops!',
            html: 'Hubo un error. Intenta nuevamente, por favor.',
            allowOutsideClick: true,
            icon: 'error',
            showConfirmButton: true,
          });
        }
      );
    } else {
      Swal.fire({
        titleText: 'Oops!',
        html: 'Primero debes aceptar los términos y condiciones.',
        allowOutsideClick: true,
        icon: 'warning',
        showConfirmButton: true,
      });
    }
  }
}
