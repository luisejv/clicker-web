import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { AdminService } from 'src/app/core/services/admin.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-validation',
  templateUrl: './car-validation.component.html',
  styleUrls: ['./car-validation.component.css'],
})
export class CarValidationComponent implements OnInit {
  hasLoaded: boolean = false;
  carros: AutoSemiNuevo[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    // this.loaderService.setIsLoading(true);
    this.adminService.getAutosNoValidados().subscribe(
      (response: AutoSemiNuevo[]) => {
        console.group('Autos No Validados');
        console.log(response);
        console.groupEnd();

        this.carros = response;
        this.hasLoaded = true;
        // this.loaderService.setIsLoading(false);
      },
      (error: any) => {
        console.error('fetching carros no validados: ', error);
        // this.loaderService.setIsLoading(false);
        // ! mostrar swal?
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  validateCar(id: number): void {
    console.group('Validate Car with Id:');
    console.log(id);
    console.groupEnd();

    //TODO: mandar el evento a car-validation, no se debería manejar acá

    Swal.fire({
      title: '¿Quieres validar este auto?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      focusDeny: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.validateAutoSemiNuevoById(id).subscribe(
          (response: AutoSemiNuevo) => {
            if (response.id! === id) {
              Swal.fire('¡Auto validado!', '', 'success');
              this.reloadComponent();
            }
          },
          (error: any) => {
            Swal.fire(
              '¡Oops!',
              'Ocurrió un error. Inténtalo de nuevo.',
              'error'
            );
            console.error(
              'when validating car with id: ',
              id,
              ' error: ',
              error
            );
          }
        );
      }
    });
  }
}
