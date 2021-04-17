import { Component, OnInit } from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { SponsorUpdate } from 'src/app/core/interfaces/sponsor-update';
import { AdminService } from 'src/app/core/services/admin.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-sponsor',
  templateUrl: './car-sponsor.component.html',
  styleUrls: ['./car-sponsor.component.css']
})
export class CarSponsorComponent implements OnInit {

  hasLoaded: boolean = false;
  carros: AutoSemiNuevo[] = [];

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);
    this.userService.getAutosSemiNuevosValidados().subscribe(
      (res: AutoSemiNuevo[]) => {
        this.carros = res;
        this.loaderService.setIsLoading(false);
        this.hasLoaded = true;
      },
      (err: any) => {
        console.error('fecthing autos semi nuevos for car-sponso.component.ts: ', err);
        this.loaderService.setIsLoading(false);
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
        max: '100'
      },
      inputValidator: (value): any => {
        if (!value) {
          return '¡Tienes que ingresar un número!';
        } else if (+value < 1 || +value > 100) {
          return '¡El nuevo ranking debe ser mínimo 1 y máximo 100!';
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
          level: level,
        };

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
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log('Swal request result:');
      console.dir(result);
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Ranking cambiado exitosamente'
        });
      }
    })
  }

}
