import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { ViewMode } from 'src/app/core/enums/view-mode.enum';
import { LoaderService } from 'src/app/core/services/loader.service';
import { param } from 'jquery';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css'],
})
export class CarRegistrationComponent implements OnInit {
  @ViewChild('ciudadInput') ciudadInput!: ElementRef<HTMLInputElement>;

  formGroup: FormGroup;
  monedas: string[] = [];
  tipos: string[] = [];
  separatorKeysCodes: number[] = [];
  ciudadesDisponibles: string[] = [];
  filteredCiudades!: Observable<string[]>;
  allCiudades: string[] = [];
  disabled: boolean = false;
  editView: boolean = false;
  carId: number = -1;
  title: string = 'Registra tu Carro';

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {
    this.formGroup = this.fb.group({
      auto: null,
      precioVenta: null,
      moneda: null,
      codversion: null,
      version: null,
      ciudadesDisponibles: null,
      kilometraje: null,
      tipoAuto: null,
      presentar: null,
      duenoCarro: null,
    });
  }

  ngOnInit(): void {
    //TODO: add spinner
    this.loaderService.setIsLoading(true);
    this.route.params.subscribe((params) => {
      if (params['id']) {
        // * view/edit mode
        this.userService.getAutoSemiNuevoById(params['id']).subscribe(
          (response: AutoSemiNuevo) => {
            console.group('autoseminuevo por id');
            console.dir(response);
            console.groupEnd();

            // this.formGroup = this.fb.group({
            //   auto: null, //TODO: cómo populamos esto
            //   precioVenta: response.precioVenta,
            //   moneda: response.moneda,
            //   codversion: response.codversion,
            //   version: response.version,
            //   ciudadesDisponibles: [response.ciudadesDisponibles],
            //   kilometraje: response.kilometraje,
            //   tipoAuto: response.tipoAuto,
            //   presentar: response.presentar,
            //   duenoCarro: response.duenoCarro,
            // });

            // //* necessary mat-chip
            // this.ciudadesDisponibles = response.ciudadesDisponibles;

            if (
              response.usuario.correo !==
              this.storageService.getEmailSessionStorage()
            ) {
              //TODO: redirigir a vista especial para visualuzar toda la data de un carro
              // * view mode: populate form and disable it
              this.formGroup.disable();
              this.disabled = true;
            } else {
              // * edit mode
              this.title = 'Actualiza tu Carro';
              this.editView = true;
              this.carId = params['id'];
            }
            this.loaderService.setIsLoading(false);
          },
          (error: any) => {
            this.loaderService.setIsLoading(false);
            console.group('error fetching autoseminuevo por id');
            console.error(error);
            console.groupEnd();
          }
        );
      } else {
        // * create view
        this.loaderService.setIsLoading(false);
      }

      console.group('Form Group');
      console.log(this.formGroup);
      console.groupEnd();

      this.monedas = this.dataService.monedas;
      this.tipos = this.dataService.tiposDeCarro;
      this.allCiudades = this.dataService.ciudades;

      this.filteredCiudades = this.ciudadesDisponiblesFormControl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this._filter(fruit) : this.allCiudades.slice()
        )
      );
    });
  }

  get ciudadesDisponiblesFormControl() {
    return this.formGroup.controls.ciudadesDisponibles;
  }

  remove(fruit: string): void {
    const index = this.ciudadesDisponibles.indexOf(fruit);

    if (index >= 0) {
      this.ciudadesDisponibles.splice(index, 1);
    }
    // TODO: setear formChanged flag porq cuando borras un matChip, formGroup.dirty no se setea a true
  }

  selected(event: any): void {
    this.ciudadInput.nativeElement.value = '';
    this.ciudadesDisponiblesFormControl.setValue(null);
    if (this.ciudadesDisponibles.includes(event.option.viewValue.trim())) {
      return;
    } else {
      this.ciudadesDisponibles.push(event.option.viewValue);
    }
    console.group('Ciudades Disponibles');
    console.log(this.ciudadesDisponibles);
    console.groupEnd();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCiudades.filter(
      (ciudad: string) => ciudad.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // toJSON(): AutoSemiNuevo {
  //   return {
  //     precioVenta: this.formGroup.value.precioVenta,
  //     moneda: this.formGroup.value.moneda,
  //     codversion: this.formGroup.value.codversion,
  //     version: this.formGroup.value.version, //TODO: revisar
  //     ciudadesDisponibles: this.ciudadesDisponibles,
  //     kilometraje: this.formGroup.value.kilometraje,
  //     tipoAuto: this.formGroup.value.tipoAuto, //TODO: definir los tipos de los autos
  //     presentar: this.formGroup.value.presentar,
  //     duenoCarro: this.formGroup.value.duenoCarro,
  //     //FIXME: si es null, que se logee de nuevo
  //     usuario: { correo: this.storageService.getEmailSessionStorage()! },
  //   };
  // }

  // registerCar(): void {
  //   // TODO: usuario.correo no puede ser null, mostrar SWAL sino
  //   const body: AutoSemiNuevo = this.toJSON();

  //   console.group('SemiNuevo JSON');
  //   console.log(this.toJSON());
  //   console.groupEnd();

  //   //TODO: chequear que el formulario sea válido

  //   if (this.editView) {
  //     this.userService.putAutoSemiNuevoById(this.carId, body).subscribe(
  //       (response: User) => {
  //         console.group('Response');
  //         console.log(response);
  //         console.groupEnd();
  //         Swal.fire({
  //           titleText: '¡Éxito!',
  //           html: 'El carro ha sido actualizado.',
  //           allowOutsideClick: true,
  //           icon: 'success',
  //           showConfirmButton: true,
  //         }).then(() => {
  //           this.router.navigateByUrl('/dashboard');
  //         });
  //       },
  //       (error: any) => {
  //         Swal.fire({
  //           titleText: 'Oops!',
  //           html: 'No se pudo actualizar el carro.',
  //           allowOutsideClick: true,
  //           icon: 'error',
  //           showConfirmButton: true,
  //         });
  //         console.group('Car Registrarion Error');
  //         console.log(error);
  //         console.groupEnd();
  //       }
  //     );
  //   } else {
  //     this.userService.postAutoSemiNuevo(body).subscribe(
  //       (response: User) => {
  //         console.group('Response');
  //         console.log(response);
  //         console.groupEnd();
  //         Swal.fire({
  //           titleText: '¡Éxito!',
  //           html: 'El carro ha sido registrado.',
  //           allowOutsideClick: true,
  //           icon: 'success',
  //           showConfirmButton: true,
  //         }).then(() => {
  //           this.router.navigateByUrl('/dashboard');
  //         });
  //       },
  //       (error: any) => {
  //         if (error.status === 423) {
  //           Swal.fire({
  //             titleText: 'Oops!',
  //             html: 'Se agotaron sus subidas anuales.',
  //             allowOutsideClick: true,
  //             icon: 'warning',
  //             showConfirmButton: true,
  //           });
  //         }
  //         console.group('Car Registrarion Error');
  //         console.log(error);
  //         console.groupEnd();
  //       }
  //     );
  //   }
  // }
}
