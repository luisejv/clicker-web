import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from 'src/app/core/interfaces/auto-semi-nuevo';
import { SponsorUpdate } from 'src/app/core/interfaces/sponsor-update';
import { AdminService } from 'src/app/core/services/admin.service';
import { ClientService } from 'src/app/core/services/client.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-sponsor',
  templateUrl: './car-sponsor.component.html',
  styleUrls: ['./car-sponsor.component.css'],
})
export class CarSponsorComponent implements OnInit {
  hasLoaded: boolean = false;
  carros: SponsoredCar[] = [];

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private loaderService: LoaderService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);
    this.clientService.getSponsoredCars().subscribe(
      (res: SponsoredCar[]) => {
        console.log(res);
        this.carros = res;
        this.loaderService.setIsLoading(false);
        this.hasLoaded = true;
      },
      (err: any) => {
        console.error(
          'fecthing autos semi nuevos for car-sponso.component.ts: ',
          err
        );
        this.loaderService.setIsLoading(false);
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  removeSponsor(id: number): void {
    console.log('remove sponsor for car with id: ', id);
    this.adminService.removeSponsoredCar(id).subscribe(
      (res: any) => {
        console.group('Remove Sponsor Response');
        console.dir(res);
        console.groupEnd();
        Swal.fire({
          title: '¡Éxito!',
          icon: 'success',
          text: 'El carro ha sido quitado de los carros auspiciados.',
        });
        this.reloadComponent();
      },
      (err: any) => {
        console.error('when removing sponsor: ', { err });
        Swal.fire({
          title: '¡Error!',
          icon: 'error',
          text: 'Ocurrió un error. Inténtalo de nuevo.',
        });
      }
    );
  }

  setSponsorLevel(carId: number): void {
    Swal.fire({
      title: 'Cambiar ranking',
      input: 'number', //TODO: cambiar a number
      inputLabel: 'Ingresar nuevo ranking',
      inputAttributes: {
        min: '1',
        max: '8',
      },
      inputValidator: (value): any => {
        if (!value) {
          return '¡Tienes que ingresar un número!';
        } else if (+value < 1 || +value > 8) {
          return '¡El nuevo ranking debe ser mínimo 1 y máximo 8!';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
      showLoaderOnConfirm: true,
      preConfirm: (level: number) => {
        const putBody: SponsorUpdate = {
          id: carId,
          level: Number(level),
        };
        console.log('putBody', { putBody });
        return this.adminService.putSponsoredCarLevel(putBody).subscribe(
          (res: any) => {
            console.log('put sponsor level response:');
            console.dir(res);
          },
          (err: any) => {
            console.log('put sponsor level error:');
            console.error(err);
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log('Swal request result:');
      console.dir(result);
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ranking cambiado exitosamente',
        }).then(() => {
          this.reloadComponent();
        });
      }
    });
  }
}
