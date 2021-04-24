import {
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import Swal from 'sweetalert2';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { UploadService } from 'src/app/core/services/upload.service';
import { Fotos } from '../shared/car-cu/car-cu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css'],
})
export class CarRegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService,
  ) {
    console.log('this.uploadService: ', this.uploadService);
  }

  ngOnInit(): void {}

  postCar(body: AutoSemiNuevo, fotos: Fotos[], uploadedPhotos: EventEmitter<string>): void {
    let cont = 0;
    if (fotos.length > 0) {
      fotos.forEach((foto, index) => {
        console.log(foto);
        console.log('this.uploadService: ', this.uploadService);
        //FIXME: la linea de abajo da error, dice que 'this.uploadService' es undefined
        this.uploadService.uploadFile(foto.foto![0], index);
      });
      this.uploadService.uploadedData.subscribe(
        (response: any) => {
          fotos[response.index].url = response.url;
          cont += 1;
          if (cont == fotos.length) {
            uploadedPhotos.emit('ª');
          }
        },
        (error: any) => {
          console.log('Error uploading photo #' + cont, error);
        }
      );
    }
    if (fotos.length > 0) {
      uploadedPhotos.subscribe(
        (response) => {
          console.log('contador', cont);
          body.fotoPrincipal = fotos[0].url;
          body.fotos = fotos.slice(1).map((foto) => {
            return {
              foto: foto.url,
            };
          });
          console.group('SemiNuevo JSON');
          console.log(body);
          console.groupEnd();
          this.userService.postAutoSemiNuevo(body).subscribe(
            (response: User) => {
              console.group('Response');
              console.log(response);
              console.groupEnd();
              Swal.fire({
                titleText: '¡Éxito!',
                html: 'Su auto ha sido registrado.',
                allowOutsideClick: true,
                icon: 'success',
                showConfirmButton: true,
              }).then(() => {
                this.router.navigateByUrl('/dashboard');
              });
            },
            (error: any) => {
              if (error.status === 423) {
                Swal.fire({
                  titleText: 'Oops!',
                  html: 'Se agotaron sus subidas anuales.',
                  allowOutsideClick: true,
                  icon: 'warning',
                  showConfirmButton: true,
                });
              }
              if (error.status === 226) {
                Swal.fire({
                  titleText: 'Oops!',
                  html: 'El auto ya existe actualmente en la aplicación!!',
                  allowOutsideClick: true,
                  icon: 'warning',
                  showConfirmButton: true,
                });
              }
              console.group('Car Registrarion Error');
              console.error(error);
              console.groupEnd();
            }
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.userService.postAutoSemiNuevo(body).subscribe(
        (response: User) => {
          console.group('Response');
          console.log(response);
          console.groupEnd();
          Swal.fire({
            titleText: '¡Éxito!',
            html: 'Su auto ha sido registrado.',
            allowOutsideClick: true,
            icon: 'success',
            showConfirmButton: true,
          }).then(() => {
            this.router.navigateByUrl('/dashboard/publicados-carros');
          });
        },
        (error: any) => {
          if (error.status === 423) {
            Swal.fire({
              titleText: 'Oops!',
              html: 'Se agotaron sus subidas anuales.',
              allowOutsideClick: true,
              icon: 'warning',
              showConfirmButton: true,
            });
          }
          if (error.status === 226) {
            Swal.fire({
              titleText: 'Oops!',
              html: 'El auto ya existe actualmente en la aplicación!!',
              allowOutsideClick: true,
              icon: 'warning',
              showConfirmButton: true,
            });
          }
          console.group('Car Registrarion Error');
          console.error(error);
          console.groupEnd();
        }
      );
    }
  }

}
