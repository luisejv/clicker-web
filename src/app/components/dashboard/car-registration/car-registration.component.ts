import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css']
})
export class CarRegistrationComponent implements OnInit {
  @ViewChild('ciudadInput') ciudadInput!: ElementRef<HTMLInputElement>;

  formGroup: FormGroup;
  monedas: string[];
  tipos: string[];
  separatorKeysCodes: number[] = [];
  ciudadesDisponibles: string[] = [];
  filteredCiudades: Observable<string[]>;
  allCiudades: string[];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
  ) { 

    // * importante
    // ? pregunta
    // ! ciudado, muy importante
    // TODO: pendiente

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

    this.filteredCiudades = this.ciudadesDisponiblesFormControl.valueChanges.pipe(
      startWith(null),
      map(
        (fruit: string | null) => fruit ? this._filter(fruit) : this.allCiudades.slice()
      )
    );

    this.monedas = this.dataService.monedas;
    this.tipos = this.dataService.tiposDeCarro;
    this.allCiudades = this.dataService.ciudades;

    console.group('Form Group')
    console.log(this.formGroup);
    console.groupEnd();

  }

  ngOnInit(): void {
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
    return this.allCiudades.filter(ciudad => ciudad.toLowerCase().indexOf(filterValue) === 0);
  }

  toJSON(): AutoSemiNuevo {
    return {
      auto: { id: 1, modelo: 'Jaguar' }, // TODO: cambiar
      precioVenta: this.formGroup.value.precioVenta,
      moneda: this.formGroup.value.moneda,
      codversion: this.formGroup.value.codversion,
      version: this.formGroup.value.version, //TODO: revisar
      ciudadesDisponibles: this.ciudadesDisponibles,
      kilometraje: this.formGroup.value.kilometraje,
      tipoAuto: this.formGroup.value.tipoAuto, //TODO: definir los tipos de los autos
      presentar: this.formGroup.value.presentar,
      duenoCarro: this.formGroup.value.duenoCarro,
      //FIXME: si es null, que se logee de nuevo
      usuario: { correo: this.storageService.getEmailSessionStorage()! },
    };
  }

  registerCar(): void {
    // TODO: usuario.correo no puede ser null, mostrar SWAL sino
    const body: AutoSemiNuevo = this.toJSON();

    console.group('JSON')
    console.log(this.toJSON());
    console.groupEnd();

    //TODO: chequear que el formulario sea válido

    this.userService.postAutoSemiNuevo(body).subscribe(
      (response: User) => {
        console.group('Response');
        console.log(response);
        console.groupEnd();
        Swal.fire({
          titleText: '¡Éxito!',
          html: 'El carro ha sido registrado.',
          allowOutsideClick: true,
          icon: 'success',
          showConfirmButton: true
        }).then(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      (error: any) => {
        console.group('Car Registrarion Error');
        console.log(error);
        console.groupEnd();
      }
    );
    
  }

}
