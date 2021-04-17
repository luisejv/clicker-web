import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Fotos } from '../shared/car-cu/car-cu.component';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css'],
})
export class CarRegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {}

  postCar(body: AutoSemiNuevo, fotos: Fotos[], uploadedPhotos: EventEmitter<string>): void {
    let cont = 0;
    if (fotos.length > 0) {
      fotos.forEach((foto, index) => {
        console.log(foto);
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
  }

}
