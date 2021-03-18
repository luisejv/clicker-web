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

  mostrarVentaDetails(auto: AutoInteresado): void {
    console.log("mostrar detalles de la venta del auto: ", {auto});
    const dialogRef = this.dialog.open(VentaDetailsComponent, {
      width: this.commonService.screenWidth <= 672 ? '100vw' : '50vw',
      height: 'fit-content',
      data: auto,
    });
  }

}
