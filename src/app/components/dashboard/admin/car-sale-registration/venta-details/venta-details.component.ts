import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { InteresadoCompra } from 'src/app/core/interfaces/interesado-compra';
import { InteresadoReventa } from 'src/app/core/interfaces/interesado-reventa';
import { Venta } from 'src/app/core/interfaces/venta';
import { AdminService } from 'src/app/core/services/admin.service';
import { CommonService } from 'src/app/core/services/common.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-venta-details',
  templateUrl: './venta-details.component.html',
  styleUrls: ['./venta-details.component.css']
})
export class VentaDetailsComponent implements OnInit {
  formGroup!: FormGroup;
  constancia!: File;
  constanciaUrl!: string;
  interesadosCompra: InteresadoCompra[] = [];
  filteredInteresadosCompra: InteresadoCompra[] = [];
  interesadosReventa: InteresadoReventa[] = [];
  filteredInteresadosReventa: InteresadoReventa[] = [];

  constructor(
    public dialogRef: MatDialogRef<VentaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AutoInteresado,
    private router: Router,
    public commonService: CommonService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private adminService: AdminService,
  ) {
    console.group('Dialog Data');
    console.dir(data);
    console.groupEnd();
  }

  ngOnInit(): void {
    // TODO: validators for 'comisionGeneral' and 'precioFinalVenta'
    this.formGroup = this.fb.group({
      vendidoPorRevendedor: [null, [Validators.required]],
      vendedor: [null, [Validators.required, this.vendedorMatch.bind(this)]],
      comprador: [null, [Validators.required, this.compradorMatch.bind(this)]],
      constanciaFoto: [null, [Validators.required]],
      comisionGeneral: [null, [Validators.required]],
      precioFinalVenta: [null, [Validators.required]],
    });
  }

  private vendedorMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (
      this.interesadosReventa && // existe
      this.interesadosReventa.indexOf(selection) < 0 && // existe dentro de la lista
      !control.errors?.required && // no esta vacío
      selection != ''
    ) {
      return { requireMatch: true };
    }
    return null;
  }

  private compradorMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (
      this.interesadosCompra && // existe
      this.interesadosCompra.indexOf(selection) < 0 && // existe dentro de la lista
      !control.errors?.required && // no esta vacío
      selection != ''
    ) {
      return { requireMatch: true };
    }
    return null;
  }

  public showInteresadoCompra = (interesado?: InteresadoCompra) => {
    return interesado?.nombre || '';
  }

  public showInteresadoReventa = (interesado?: InteresadoReventa) => {
    return (
      interesado !== undefined ?
      `${interesado?.usuario.nombre} ${interesado?.usuario.apellidos}` :
      ''
    );
  }

  updateInteresados(): void {
    //TODO: aqui asignar 'interesadosCompra' y 'interesadosReventa'
    
    if (this.formGroup.value.vendidoPorRevendedor) {
      this.interesadosReventa = this.data.interesadosReventa;
    } else {
      this.interesadosCompra = this.data.interesadosCompra;
    }

  }

  filterInteresados(e: any) {
    const queryFilter = this._normalizeValue(e.target.value);

    if (this.formGroup.value.vendidoPorRevendedor) {
      // interesadosReventa
      this.filteredInteresadosReventa = this.interesadosReventa.filter((interesado: InteresadoReventa) => {
        //TODO: descripción tmb?
        //FIXME: aca no tiene nombre, solo correo
        return (
          this._normalizeValue(interesado.usuario.correo!).includes(queryFilter)
        );
      });
    } else {
      // interesadosCompra
      this.filteredInteresadosCompra = this.interesadosCompra.filter((interesado: InteresadoCompra) => {
        return (
          this._normalizeValue(interesado.nombre).includes(queryFilter) ||
          this._normalizeValue(interesado.correo).includes(queryFilter) ||
          this._normalizeValue(interesado.numTelefono.toString()).includes(queryFilter)
        );
      });
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  addPhoto(e: any): void {
    this.constancia = e.target.files[0];
    console.log(this.constancia);
  }

  registrarVenta(): void {
    const form = this.formGroup.value;

    this.uploadService.uploadFile(this.constancia);

    this.uploadService.uploadedData.subscribe(
      (response: any) => {
        this.constanciaUrl = response.url;

        //TODO: lo del comprador, si lo mando o no
        const body: Venta = {
          autoSemiNuevo: this.data.auto,
          vendedor: form.vendidoPorRevendedor ? { correo: form.vendedor.correo } : null,
          ciudadCompra: 'Lima', //FIXME: cambiar
          foto: this.constanciaUrl,
        };

        //TODO: añadir estos 2 al form y mandarlos en el body
        // "comisionGeneral": "0.05",
        // "precioFinalVenta": 10000

        console.group('Sale Registrarion JSON');
        console.dir(body);
        console.groupEnd();

        //TODO: request

        this.adminService.registrarVenta(body).subscribe(
          (response: any) => {
            console.group('Car Registration Response');
            console.dir(response);
            console.groupEnd();
          },
          (error: any) => {
            console.error('registering car sale: ', error);
          }
        );

      },
      (error: any) => {
        console.error('Error uploading constancia de pago', error);
      }
    );
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
