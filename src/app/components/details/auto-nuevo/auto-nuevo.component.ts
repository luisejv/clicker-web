import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { AutoNuevo } from 'src/app/core/interfaces/auto-nuevo';
import { Lead } from 'src/app/core/interfaces/lead';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-nuevo',
  templateUrl: './auto-nuevo.component.html',
  styleUrls: ['./auto-nuevo.component.css'],
})
export class AutoNuevoComponent implements OnInit {
  loading: boolean = true;
  auto!: AutoNuevo;
  contactFormGroup!: FormGroup;
  logged: boolean;
  isAdmin: boolean;
  sendingContactForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private clientService: ClientService
  ) {
    this.logged = this.storageService.isLoggedIn();
    this.isAdmin =
      this.storageService.getRoleLocalStorage() == RolesEnum.ADMIN ||
      this.storageService.getRoleLocalStorage() == RolesEnum.SUPERADMIN;
    this.contactFormGroup = this.fb.group({
      dni: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      correo: '',
      descripcion: '',
    });
  }

  slideConfig = {
    arrows: false,
    fade: true,
    asNavFor: '.js-slider-for',
  };

  slideConfig2 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.js-slider-nav',
    focusOnSelect: true,
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.group('Params');
      console.log(params);
      console.groupEnd();
      if (params['id']) {
        console.log('auto-nuevo id param: ', params['id']);
        this.userService.getAutoNuevoById(params['id']).subscribe(
          (res: AutoNuevo) => {
            this.auto = res;
            console.group('Auto nuevo');
            console.log(res);
            console.groupEnd();
          },
          (err: any) => {
            this.router.navigate(['/home']);
            console.error('fetching auto nuevo por id: ', params['id']);
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  submitForm(): void {
    this.sendingContactForm = true;
    const body: Lead = {
      DNI: this.contactFormGroup.value.dni,
      First_Name: this.contactFormGroup.value.nombres,
      Last_Name: this.contactFormGroup.value.apellidos,
      Phone_Number: this.contactFormGroup.value.telefono,
      Email: this.contactFormGroup.value.correo,
      Carroceria_Vehiculo: this.auto.tipoCarroceria,
      Nuevo: false,
      ID_Auto: Number(this.auto.id),
    };
    this.clientService.postPilot(body).subscribe(
      (response) => {
        Swal.fire({
          title: 'Enviado!',
          icon: 'success',
          html: 'Solicitud generada! Le llamaran por telefono para seguir con el proceso de compra.',
          showConfirmButton: true,
        });
      },
      (error) => {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          html: 'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
          showConfirmButton: true,
        });
      },
      () => {
        this.sendingContactForm = false;
        this.contactFormGroup.reset();
      }
    );
  }

  contact(): void {
    this.sendingContactForm = true;
    const body: Lead = {
      DNI: this.storageService.getDniLocalStorage()!,
      First_Name: this.storageService.getNombreLocalStorage()!,
      Last_Name: this.storageService.getApellidosLocalStorage()!,
      Phone_Number: this.storageService.getPhoneLocalStorage()!,
      Email: this.storageService.getEmailLocalStorage()!,
      Carroceria_Vehiculo: this.auto.tipoCarroceria,
      Nuevo: true,
      ID_Auto: Number(this.auto.id),
    };
    this.clientService.postPilot(body).subscribe(
      (response) => {
        Swal.fire({
          title: 'Enviado!',
          icon: 'success',
          html: 'Solicitud generada! Le llamaran por telefono para seguir con el proceso de compra.',
          showConfirmButton: true,
        });
      },
      (error) => {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          html: 'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
          showConfirmButton: true,
        });
      },
      () => {
        this.sendingContactForm = false;
      }
    );
  }
}
