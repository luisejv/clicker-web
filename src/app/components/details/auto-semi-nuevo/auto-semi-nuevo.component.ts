import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from 'src/app/core/interfaces/auto-semi-nuevo';
import { Denuncia } from 'src/app/core/interfaces/denuncia';
import { Lead } from 'src/app/core/interfaces/lead';
import { AdminService } from 'src/app/core/services/admin.service';
import { ClientService } from 'src/app/core/services/client.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-semi-nuevo',
  templateUrl: './auto-semi-nuevo.component.html',
  styleUrls: ['./auto-semi-nuevo.component.css'],
})
export class AutoSemiNuevoComponent implements OnInit {
  @ViewChild('') slide1!: ElementRef;
  @ViewChild('') slide2!: ElementRef;
  auto!: AutoSemiNuevo;
  loading: boolean = true;
  logged: boolean = false;
  isRemax: boolean = false;
  isAdmin: boolean = false;

  contactFormGroup: FormGroup;

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

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    public storageService: StorageService,
    private fb: FormBuilder
  ) {
    this.logged = this.storageService.isLoggedIn();
    this.isRemax = this.storageService.getRoleLocalStorage() == RolesEnum.REMAX;
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

  ngOnInit(): void {
    this.loading = true;
    this.loaderService.setIsLoading(true);
    this.route.queryParams.subscribe((params) => {
      console.group('Params');
      console.log(params);
      console.groupEnd();
      if (params['id']) {
        this.userService.getAutoSemiNuevoById(params['id']).subscribe(
          (response: AutoSemiNuevo) => {
            console.group('AutoSemiNuevo por ID:');
            console.dir(response);
            console.groupEnd();
            this.auto = response;
            this.auto.fotos?.unshift({ foto: this.auto.fotoPrincipal });
            this.loading = false;
          },
          (error: any) => {
            console.group('Error fetching autoSemiNuevo por ID');
            console.error(error);
            console.groupEnd();
          }
        );
      } else {
        console.group('Entering detail view with no ID');
        //TODO: redirect user to home or make a guard
        console.groupEnd();
      }
      this.loaderService.setIsLoading(false);
    });
  }

  // TODO: Conectar con BD de produccion
  // ? Los dos requests de abajo tienen el mismo body y hacen la consulta al mismo lugar,
  // ? pero obtienen la data de lugares distintos.

  submitForm(): void {
    const body: Lead = {
      tipouso: this.auto.marca + '-' + this.auto.modelo + '-' + this.auto.placa,
      carroceria: this.auto.tipoCarroceria,
      dni: this.contactFormGroup.value.dni,
      nombre: this.contactFormGroup.value.nombres,
      apellidos: this.contactFormGroup.value.apellidos,
      correo: this.contactFormGroup.value.correo,
      numTelefono: this.contactFormGroup.value.telefono,
    };
    const body2 = {
      autoSemiNuevo: {
        id: this.auto.id,
      },
      dni: this.contactFormGroup.value.dni,
      nombres: this.contactFormGroup.value.nombres,
      apellidos: this.contactFormGroup.value.apellidos,
      correo: this.contactFormGroup.value.correo,
      numTelefono: this.contactFormGroup.value.telefono,
      descripcion: this.contactFormGroup.value.descripcion,
    };
    this.clientService.postPilot(body).subscribe(
      (response) => {
        Swal.fire({
          title: 'Enviado!',
          icon: 'success',
          html:
            'Solicitud generada! Le llamaran por telefono para seguir con el proceso de compra.',
          showConfirmButton: true,
        });
      },
      (error) => {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          html:
            'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
          showConfirmButton: true,
        });
      }
    );
    this.clientService.postFormInterested(body2).subscribe(
      (response) => {
        console.log('Agregado a InteresadosCompra');
      },
      (error) => {
        console.log('Error en agregar a InteresadosCompra');
      }
    );
  }

  contact(): void {
    // TODO: recoger datos de LocalStorage cuando tengamos nombres, dni, etc.
    const body: Lead = {
      tipouso: this.auto.marca + '-' + this.auto.modelo + '-' + this.auto.placa,
      carroceria: this.auto.tipoCarroceria,
      dni: this.contactFormGroup.value.dni,
      nombre: this.contactFormGroup.value.nombres,
      apellidos: this.contactFormGroup.value.apellidos,
      correo: this.contactFormGroup.value.correo,
      numTelefono: this.contactFormGroup.value.telefono,
    };
    const body2 = {
      autoSemiNuevo: {
        id: this.auto.id,
      },
      dni: this.contactFormGroup.value.dni,
      nombres: this.contactFormGroup.value.nombres,
      apellidos: this.contactFormGroup.value.apellidos,
      correo: this.contactFormGroup.value.correo,
      numTelefono: this.contactFormGroup.value.telefono,
    };
    this.clientService.postPilot(body).subscribe(
      (response) => {
        Swal.fire({
          title: 'Enviado!',
          icon: 'success',
          html:
            'Solicitud generada! Le llamaran por telefono para seguir con el proceso de compra.',
          showConfirmButton: true,
        });
      },
      (error) => {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          html:
            'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
          showConfirmButton: true,
        });
      }
    );
    this.clientService.postFormInterested(body2).subscribe(
      (response) => {
        console.log('Agregado a InteresadosCompra');
      },
      (error) => {
        console.log('Error en agregar a InteresadosCompra');
      }
    );
  }

  addCarToSponsored(): void {
    const body: SponsoredCar = {
      autoSemiNuevo: this.auto,
    };
    this.adminService.addCarToSponsored(body).subscribe(
      (response) => {
        Swal.fire({
          title: 'Agregado!',
          icon: 'success',
          html: 'Carro agregado a patrocinados.',
          showConfirmButton: true,
        });
      },
      (error: HttpErrorResponse) => {
        if (error.status == 400) {
          Swal.fire({
            title: 'Oops!',
            icon: 'error',
            html: 'El carro ya se encuentra dentro de los carros patrocinados.',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            title: 'Oops!',
            icon: 'error',
            html:
              'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
            showConfirmButton: true,
          });
        }
      }
    );
  }

  denunciar(descripcion: string): void {
    console.log('denunciar auto. descripcion: ', descripcion);

    if (descripcion === '') {
      Swal.fire('¡Debes poner una descripción!', '', 'error');
      return;
    }

    const body: Denuncia = {
      autoSemiNuevo: {
        id: this.auto.id!,
      },
      usuario: {
        correo: this.storageService.getEmailLocalStorage(),
      },
      descripcion: descripcion,
    };

    Swal.fire({
      title: '¿Denunciar este carro?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.denunciar(body).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire('Denunciado', '', 'success');
          },
          (error: any) => {
            console.error('denunciando: ', error);
            Swal.fire('No se puede denunciar un carro dos veces', '', 'error');
          }
        );
      }
    });
  }

  addToInsterested(): void {
    let body = {
      autoSemiNuevo: {
        id: this.auto.id,
      },
      usuario: {
        correo: this.storageService.getEmailLocalStorage(),
      },
    };
    this.userService.addCarToInsterested(body).subscribe(
      (response) => {
        console.group('Interesado Venta Response');
        console.log(response);
        console.groupEnd();
        Swal.fire({
          title: 'Agregado!',
          icon: 'success',
          html:
            'Carro agregado a interesados por vender. Ya puedes empezar a ofrecerlo entre tus contactos!',
          showConfirmButton: true,
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          html:
            'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
          showConfirmButton: true,
        });
        console.log('Error processing request: ', error);
      }
    );
  }
}
