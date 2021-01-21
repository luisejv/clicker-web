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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ciudadesDisponibles: string[] = [];
  ciudadesFormControl: FormControl = new FormControl();
  filteredCiudades: Observable<string[]>;
  allCiudades: string[];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private dataService: DataService,
  ) { 

    this.filteredCiudades = this.ciudadesFormControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCiudades.slice()));

    this.monedas = this.dataService.monedas;
    this.tipos = this.dataService.tiposDeCarro;
    this.allCiudades = this.dataService.ciudades;

    this.formGroup = this.fb.group({
      auto: null,
      precioVenta: null,
      moneda: null,
      codversion: null,
      version: null,
      ciudadesDisponibles: new FormControl(),
      kilometraje: null,
      tipoAuto: null,
      presentar: null,
      duenoCarro: null,
      usuario: { correo: this.storageService.getEmailSessionStorage() },
    });
  }

  ngOnInit(): void {
    console.log(this.formGroup);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.ciudadesDisponibles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    // this.ciudadesDisponibles.setValue(null);
    // TODO: formChanged flag
  }

  remove(fruit: string): void {
    const index = this.ciudadesDisponibles.indexOf(fruit);

    if (index >= 0) {
      this.ciudadesDisponibles.splice(index, 1);
    }
    // TODO: formChanged flag
  }

  //FIXME typed requests
  toJSON(): any {
    //TODO
  }

  selected(event: any): void {
    this.ciudadesDisponibles.push(event.option.viewValue);
    this.ciudadInput.nativeElement.value = '';
    this.ciudadesFormControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCiudades.filter(ciudad => ciudad.toLowerCase().indexOf(filterValue) === 0);
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
