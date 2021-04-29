import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { DataService } from 'src/app/core/services/data.service';
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
  styleUrls: ['./car-cu.component.css'],
})
export class CarCuComponent implements OnInit {
  @Input() create: boolean = false;
  @Input() update: boolean = false;
  @Input() title!: string;
  @Input() submitButtonText!: string;
  @Input() updateAction!: (auto: AutoSemiNuevo) => void;
  @Input() createAction!: (
    body: AutoSemiNuevo,
    fotos: Fotos[],
    uploadedPhotos: EventEmitter<string>
  ) => void;

  formGroup: FormGroup;
  carId: number = -1;
  fotoPrincipal!: File;
  fotos: Fotos[] = [];
  uploadedPhotos = new EventEmitter<string>();
  validatedPlaca: boolean = false;
  role: string | null;
  correo: string | null;
  fetchingPlaca: boolean = false;
  date: Date;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    public dataService: DataService,
    public uploadService: UploadService
  ) {
    this.date = new Date();
    this.role = this.storageService.getRoleLocalStorage();
    this.correo = this.storageService.getEmailLocalStorage();
    // TODO: validators
    // TODO: validator cuando entra a editar, ningun campo que ya esté, debe cambiar a vacío, o sí puede?
    //NOTE: sería paja autocompletar la info del usuario particular para ahorrarle chamba
    // F3W642
    // BJX356
    this.formGroup = this.fb.group({
      id: '',
      correoDueno: [this.correo, [Validators.required, Validators.email]],
      nombreDueno: ['Gabriel Spranger', [Validators.required]],
      telefonoDueno: ['965776360', [Validators.required]],
      placa: [
        'BBB222',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      serie: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      anoFabricacion: [
        '2018',
        [
          Validators.required,
          Validators.max(this.date.getFullYear() + 1),
          Validators.maxLength(4),
          Validators.min(1999),
        ],
      ],
      tipoCambios: ['Automático', Validators.required],
      tipoCombustible: ['Eléctrico', Validators.required],
      tipoCarroceria: ['SUV', Validators.required],
      cilindrada: [
        '1200',
        [Validators.required, Validators.min(100), Validators.max(32000)],
      ],
      kilometraje: ['120000', Validators.required],
      numeroPuertas: ['5', Validators.required],
      tipoTraccion: ['Trasera', Validators.required],
      color: ['Azul', Validators.required],
      numeroCilindros: [
        '4',
        [Validators.required, Validators.min(1), Validators.max(16)],
      ],
      precioVenta: ['69420', Validators.required],
      video: '',
    });
  }

  checkPlaca(): void {
    this.fetchingPlaca = true;
    let body = {
      placa: this.formGroup.controls['placa'].value,
      token: 'fe6ae5a7928cd90ea30f7c3767c9c25bb2a4d0ea',
    };
    this.userService.getPlacaDetails(body).subscribe(
      (response: any) => {
        console.log(response);
        if (
          response.success &&
          (response.encontrado === undefined || response.encontrado)
        ) {
          this.formGroup.controls['serie'].setValue(response.data.serie);
          this.formGroup.controls['marca'].setValue(response.data.marca);
          this.formGroup.controls['modelo'].setValue(response.data.modelo);
          console.log(this.formGroup);
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
          this.formGroup.controls['placa'].setValue('');
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
        console.error(error);
      },
      () => {
        this.fetchingPlaca = false;
      }
    );
  }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);
    if (this.update || this.role === RolesEnum.ADMIN) {
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.userService.getAutoSemiNuevoById(params['id']).subscribe(
            (res: AutoSemiNuevo) => {
              if (
                this.role !== RolesEnum.ADMIN &&
                this.role !== RolesEnum.SUPERADMIN &&
                res.usuario.correo !== this.correo
              ) {
                // el sapaso (que no es admin ni superadmin) esta tratando de editar un carro que no es suyo
                // this.router.navigate(['/sapos-al-agua']);
                console.log(
                  'sapaso, ese no es tu carro, porq lo quieres editar'
                );
                this.router.navigate(['/home']);
                return;
              }

              console.group('autoseminuevo por id');
              console.dir(res);
              console.groupEnd();

              this.formGroup = this.fb.group({
                id: res.id,
                correoDueno: [res.correoDueno, [Validators.email]],
                nombreDueno: res.nombreDueno,
                telefonoDueno: res.telefonoDueno,
                // TODO: añadir el regex de una placa peruana
                placa: [
                  res.placa,
                  [Validators.minLength(6), Validators.maxLength(6)],
                ],
                serie: res.serie,
                marca: res.marca,
                modelo: res.modelo,
                anoFabricacion: [
                  res.anoFabricacion,
                  [
                    Validators.max(this.date.getFullYear()),
                    Validators.maxLength(4),
                    Validators.min(1999),
                  ],
                ],
                tipoCambios: res.tipoCambios,
                tipoCombustible: res.tipoCombustible,
                tipoCarroceria: res.tipoCarroceria,
                cilindrada: [
                  res.cilindrada,
                  [
                    Validators.required,
                    Validators.min(100),
                    Validators.max(32000),
                  ],
                ],
                kilometraje: res.kilometraje,
                numeroPuertas: res.numeroPuertas,
                tipoTraccion: res.tipoTraccion,
                color: res.color,
                numeroCilindros: [
                  res.numeroCilindros,
                  [Validators.required, Validators.min(1), Validators.max(16)],
                ],
                precioVenta: res.precioVenta,
                video: '',
              });

              this.title = 'Actualiza tu Carro';
              this.carId = params['id'];
            },
            (error: any) => {
              console.group('error fetching autoseminuevo por id');
              console.error(error);
              console.groupEnd();
            },
            () => {
              this.loaderService.setIsLoading(false);
            }
          );
        } else {
          // si no tiene params, mandarlo a home porq no hay carro que editar
          this.loaderService.setIsLoading(false);
          if (!this.create) {
            this.router.navigate(['/home']);
          }
        }

        console.group('Form Group');
        console.log(this.formGroup);
        console.groupEnd();
      });
    }
  }

  toJSON(): AutoSemiNuevo {
    const body: AutoSemiNuevo = {
      id: this.formGroup.value.id,
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
        id: '000000',
      },
    };
    if (this.create) {
      delete body.id;
    }
    return body;
  }

  addPhoto(event: any): void {
    this.fotos.push({
      isPrincipal: false,
      foto: event.target.files,
      url: '',
    });
  }

  submitActionWrapper(): void {
    if (this.formGroup.invalid) {
      Swal.fire({
        icon: 'error',
        title: '¡Llena el formulario bien!',
      });
      return;
    }
    if (this.create) {
      this.createActionWrapper();
      return;
    }
    if (this.update) {
      this.updateActionWrapper();
      return;
    }
  }

  updateActionWrapper(): void {
    this.updateAction(this.toJSON());
  }

  createActionWrapper(): void {
    this.createAction(this.toJSON(), this.fotos, this.uploadedPhotos);
  }
}
