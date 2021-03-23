import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { AdminService } from 'src/app/core/services/admin.service';
import { CommonService } from 'src/app/core/services/common.service';
import { VentaDetailsComponent } from './venta-details/venta-details.component';

@Component({
  selector: 'app-car-sale-registration',
  templateUrl: './car-sale-registration.component.html',
  styleUrls: ['./car-sale-registration.component.css']
})
export class CarSaleRegistrationComponent implements OnInit {

  carros!: AutoInteresado[];
  hasLoaded: boolean = false;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.adminService.getCarrosInteresados().subscribe(
      (response: AutoInteresado[]) => {
        console.group('Autos Interesados');
        console.dir(response);
        this.carros = response;
        console.groupEnd();
        this.hasLoaded = true;
      },
      (error: any) => {
        console.error('when fetching carros interesados: ', error);
      }
    );
  }

  getDialogWidth(): string {
    if (this.commonService.screenWidth > 672 && this.commonService.screenWidth <= 1000) {
      return '60%';
    } else if (this.commonService.screenWidth <= 672) {
      return '97%';
    } else {
      return '40%';
    }
  }

  getDialogHeight(): string {
    if (this.commonService.screenWidth <= 672) {
      return '80%';
    } else {
      return '60%';
    }
  }

  mostrarVentaDetails(auto: AutoInteresado): void {
    console.log("mostrar detalles de la venta del auto: ", {auto});
    const dialogRef = this.dialog.open(VentaDetailsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      data: auto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit(); // TODO: hacer este refresh? o es innecesario?
      console.log('dialog after closed callback');
    });
  }

}
