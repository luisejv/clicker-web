import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
      usuario: { correo: this.storageService.getEmailSessionStorage() },
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    //TODO: no dejar que elija la misma ciudad 2 veces

    if ((value || '').trim()) {
      this.ciudadesDisponibles.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.ciudadesDisponibles.indexOf(fruit);

    if (index >= 0) {
      this.ciudadesDisponibles.splice(index, 1);
    }
    // TODO: formChanged flag porq cuando borras un matChip, formGroup.dirty no se setea a true
  }

  selected(event: any): void {
    this.ciudadesDisponibles.push(event.option.viewValue);
    this.ciudadInput.nativeElement.value = '';
    this.ciudadesDisponiblesFormControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCiudades.filter(ciudad => ciudad.toLowerCase().indexOf(filterValue) === 0);
  }

  //FIXME typed requests (change ': any' to a interface)
  toJSON(): any {
    //TODO
  }

  registerCar(): void {
    //TODO: chequear que el formulario sea válido
    Swal.fire({
      titleText: '¡Éxito!',
      html: 'El carro ha sido registrado.',
      allowOutsideClick: true,
      icon: 'success',
      showConfirmButton: true
    }).then(() => {
      this.router.navigateByUrl('/dashboard');
    });
  }

}
