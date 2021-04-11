import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { UploadService } from 'src/app/core/services/upload.service';

interface Fotos {
  isPrincipal: boolean;
  foto: FileList;
  url: string;
}

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
  fotoPrincipal!: File;
  fotos: Fotos[] = [];
  uploadedPhotos = new EventEmitter<string>();
  validatedPlaca: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private uploadService: UploadService
  ) {
    /* this.formGroup = this.fb.group({
      correoDueno: '',
      nombreDueno: '',
      telefonoDueno: '',
      placa: '',
      serie: '',
      marca: '',
      modelo: '',
      anoFabricacion: '',
      tipoCambios: '',
      tipoCombustible: '',
      tipoCarroceria: '',
      cilindrada: '',
      kilometraje: '',
      numeroPuertas: '',
      tipoTraccion: '',
      color: '',
      numeroCilindros: '',
      precioVenta: '',
      video: '',
    }); */
    this.formGroup = this.fb.group({
      correoDueno: 'luis.jauregui@utec.edu.pe',
      nombreDueno: 'Luis Jáuregui',
      telefonoDueno: '997854810',
      placa: 'NSFW18',
      serie: '',
      marca: '',
      modelo: '',
      anoFabricacion: '2018',
      tipoCambios: 'Automático',
      tipoCombustible: 'Eléctrico',
      tipoCarroceria: 'SUV',
      cilindrada: '35000',
      kilometraje: '120000',
      numeroPuertas: '5',
      tipoTraccion: 'Trasera',
      color: 'Azul',
      numeroCilindros: '5',
      precioVenta: '45000',
      video: '',
    });
    this.formGroup.controls['serie'].disable();
    this.formGroup.controls['marca'].disable();
    this.formGroup.controls['modelo'].disable();
  }

  checkPlaca(): void {
    let body = {
      placa: this.formGroup.controls['placa'].value,
      token: 'fe6ae5a7928cd90ea30f7c3767c9c25bb2a4d0ea',
    };
    this.userService.getPlacaDetails(body).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.formGroup.controls['serie'].setValue(response.data.serie);
          this.formGroup.controls['marca'].setValue(response.data.marca);
          this.formGroup.controls['modelo'].setValue(response.data.modelo);
          this.validatedPlaca = true;
        } else {
          Swal.fire({
            titleText: 'Oops!',
            html:
              'No se encontró el auto con esa placa. Por favor, revise que sea correcto.',
            allowOutsideClick: true,
            icon: 'error',
            showConfirmButton: true,
          });
        }
      },
      (error: any) => {
        Swal.fire({
          titleText: 'Oops!',
          html:
            'No se encontró el auto con esa placa. Por favor, revise que sea correcto.',
          allowOutsideClick: true,
          icon: 'error',
          showConfirmButton: true,
        });
      }
    );
  }

  ngOnInit(): void {
    if (this.storageService.getGoingToCarRegistration()) {
      this.storageService.removeGoingToCarRegistration();
    }
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

            // //* necessary mat-chip
            // this.ciudadesDisponibles = response.ciudadesDisponibles;

            if (
              response.usuario.correo !==
              this.storageService.getEmailSessionStorage()
            ) {
              //TODO: redirigir a vista especial para visualuzar toda la data de un carro
              // * view mode: populate form and disable it
              //this.formGroup.disable();
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

      // this.monedas = this.dataService.monedas;
      // this.tipos = this.dataService.tiposDeCarro;
      // this.allCiudades = this.dataService.ciudades;

      // this.filteredCiudades = this.ciudadesDisponiblesFormControl.valueChanges.pipe(
      //   startWith(null),
      //   map((fruit: string | null) =>
      //     fruit ? this._filter(fruit) : this.allCiudades.slice()
      //   )
      // );
    });
  }

  get ciudadesDisponiblesFormControl() {
    return this.formGroup.controls.ciudadesDisponibles;
  }

  /*  remove(fruit: string): void {
    const index = this.ciudadesDisponibles.indexOf(fruit);

    if (index >= 0) {
      this.ciudadesDisponibles.splice(index, 1);
    }
    // TODO: setear formChanged flag porq cuando borras un matChip, formGroup.dirty no se setea a true
  } */

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

  /* private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCiudades.filter(
      (ciudad: string) => ciudad.toLowerCase().indexOf(filterValue) === 0
    );
  } */

  toJSON(): AutoSemiNuevo {
    return {
      //FIXME: si es null, que se logee de nuevo
      usuario: {
        correo: this.storageService.getEmailLocalStorage()!,
      },
      placa: this.formGroup.value.placa,
      serie: this.formGroup.value.serie,
      correoDueno: this.formGroup.value.correoDueno,
      nombreDueno: this.formGroup.value.nombreDueno,
      telefonoDueno: this.formGroup.value.telefonoDueno,
      marca: this.formGroup.value.marca,
      modelo: this.formGroup.value.modelo,
      anoFabricacion: this.formGroup.value.anoFabricacion,
      tipoCambios: this.formGroup.value.tipoCambios,
      tipoCombustible: this.formGroup.value.tipoCombustible,
      tipoCarroceria: this.formGroup.value.tipoCarroceria,
      cilindrada: this.formGroup.value.cilindrada,
      kilometraje: this.formGroup.value.kilometraje,
      numeroPuertas: this.formGroup.value.numeroPuertas,
      tipoTraccion: this.formGroup.value.tipoTraccion,
      color: this.formGroup.value.color,
      numeroCilindros: this.formGroup.value.numeroCilindros,
      precioVenta: this.formGroup.value.precioVenta,
      video: this.formGroup.value.video,
      fotoPrincipal: '',
      fotos: [],
      accesorios: [],
      locacion: {
        id: '150103',
      },
    };
  }

  postCar(): void {
    let body: AutoSemiNuevo = this.toJSON();
    let cont = 0;
    if (this.fotos.length > 0) {
      this.fotos.forEach((foto, index) => {
        console.log(foto);
        this.uploadService.uploadFile(foto.foto![0], index);
      });
      this.uploadService.uploadedData.subscribe(
        (response: any) => {
          this.fotos[response.index].url = response.url;
          cont += 1;
          if (cont == this.fotos.length) {
            this.uploadedPhotos.emit('ª');
          }
        },
        (error: any) => {
          console.log('Error uploading photo #' + cont, error);
        }
      );
    }
    this.uploadedPhotos.subscribe(
      (response) => {
        console.log('contador', cont);
        body.fotoPrincipal = this.fotos[0].url;
        body.fotos = this.fotos.slice(1).map((foto) => {
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

  addPhoto(event: any): void {
    this.fotos.push({
      isPrincipal: false,
      foto: event.target.files,
      url: '',
    });
  }
}
