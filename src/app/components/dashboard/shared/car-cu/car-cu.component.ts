import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

export interface Fotos {
  isPrincipal: boolean;
  foto: FileList;
  url: string;
}

@Component({
  selector: 'app-car-cu',
  templateUrl: './car-cu.component.html',
  styleUrls: ['./car-cu.component.css']
})
export class CarCuComponent implements OnInit {

  @Input() create: boolean = false;
  @Input() update: boolean = false;
  @Input() title!: string;
  @Input() submitButtonText!: string;
  @Input() updateAction!: (auto: AutoSemiNuevo) => void;
  @Input() createAction!: (body: AutoSemiNuevo, fotos: Fotos[], uploadedPhotos: EventEmitter<string>) => void;

  formGroup: FormGroup;
  disabled: boolean = false;
  editView: boolean = false;
  carId: number = -1;
  fotoPrincipal!: File;
  fotos: Fotos[] = [];
  uploadedPhotos = new EventEmitter<string>();
  validatedPlaca: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private uploadService: UploadService
  ) {
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
    this.loaderService.setIsLoading(true);
    this.route.params.subscribe((params) => {
      if (params['id']) {
        // * view/edit mode
        this.userService.getAutoSemiNuevoById(params['id']).subscribe(
          (res: AutoSemiNuevo) => {
            console.group('autoseminuevo por id');
            console.dir(res);
            console.groupEnd();

            // this.formGroup = this.fb.group({...res});

            this.formGroup = this.fb.group({
              correoDueno: res.correoDueno,
              nombreDueno: res.nombreDueno,
              telefonoDueno: res.telefonoDueno,
              placa: this.update ? res.placa : '',
              serie: this.update ? res.serie : '',
              marca: this.update ? res.marca : '',
              modelo: res.modelo,
              anoFabricacion: res.anoFabricacion,
              tipoCambios: res.tipoCambios,
              tipoCombustible: res.tipoCombustible,
              tipoCarroceria: res.tipoCarroceria,
              cilindrada: res.cilindrada,
              kilometraje: res.kilometraje,
              numeroPuertas: res.numeroPuertas,
              tipoTraccion: res.tipoTraccion,
              color: res.color,
              numeroCilindros: res.numeroCilindros,
              precioVenta: res.precioVenta,
              video: '',
            });

            if (this.create) {
              this.formGroup.controls['serie'].disable();
              this.formGroup.controls['marca'].disable();
              this.formGroup.controls['modelo'].disable();
            }

            if (
              res.usuario.correo !==
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
    });
  }

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

  addPhoto(event: any): void {
    this.fotos.push({
      isPrincipal: false,
      foto: event.target.files,
      url: '',
    });
  }

  updateActionWrapper(): void {
    this.updateAction(this.toJSON());
  }

  createActionWrapper(): void {
    this.createAction(this.toJSON(), this.fotos, this.uploadedPhotos);
  }

}
