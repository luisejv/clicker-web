import { Component, OnInit } from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
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

    //TODO: mandar request
    console.log(`setting new sponsor level (choose in dialog) for car with id: ${carId}`);

    Swal.fire({
      title: 'Cambiar ranking',
      input: 'text', //TODO: cambiar a number
      inputLabel: 'Ingresar nuevo ranking',
      // inputAttributes: {
      //   min: '0',
      //   max: '100'
      // },
      inputValidator: (value): any => {
        if (!value) {
          return '¡Tienes que ingresar un número!'
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
      showLoaderOnConfirm: true,
      preConfirm: (login: string) => {
        // TODO: mandar request con admin service
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      //TODO: adaptar esto a lo que devuelve cesar
      console.log('Swal request result:');
      console.dir(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })

  }

}
