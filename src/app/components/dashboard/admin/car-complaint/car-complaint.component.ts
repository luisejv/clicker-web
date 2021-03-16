import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { AdminService } from 'src/app/core/services/admin.service';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';
import { ReportersComponent } from './reporters/reporters.component';

@Component({
  selector: 'app-car-complaint',
  templateUrl: './car-complaint.component.html',
  styleUrls: ['./car-complaint.component.css']
})
export class CarComplaintComponent implements OnInit {

  hasLoaded: boolean = false;
  carros: AutoReportado[]= [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.adminService.getAutosReportados().subscribe(
      (response: AutoReportado[]) => {
        console.group('Autos No Validados');
        console.log(response);
        console.groupEnd();

        this.carros = response;
        this.hasLoaded = true;
        // this.loaderService.setIsLoading(false);
      },
      (error: any) => {
        console.error('fetching carros reportados: ', error);
        // this.loaderService.setIsLoading(false);
        // ! mostrar swal?
      }
    );
  }

  showReporters(auto: AutoReportado): void {
    console.log("mostrar los que reportaron este carro: ", {auto});
    const dialogRef = this.dialog.open(ReportersComponent, {
      // TODO: en mobil se ve feaso porq no abarca toda la pantalla
      width: this.commonService.screenWidth <= 672 ? '100vw' : '50vw',
      height: 'fit-content',
      data: {
        carId: auto.id,
        denuncias: auto.denuncias
      }
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("dialog after closed callback");
      }
    );
  }

  removeCar(id: number): void {
    console.log("remover carro denunciado con id: ", id);
    Swal.fire({
      title: '¿Eliminar carro de Clicker?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      focusDeny: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.removeAutoReportado(id).subscribe(
          (res: any) => {
            console.log(res);
            console.log("carro borrado de clicker");
          },
          (error: any) => {
            console.error('removing car with id: ', id, ' from clicker');
          }
        );
      } else {
        console.log("cancelar borrado");
      }
    });
  }

  markAsValid(id: number): void {
    console.log("marcar carro reportado como válido con id: ", id);
    Swal.fire({
      title: '¿Eliminar carro de la lista de carros reportados?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      focusDeny: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.validateAutoReportado(id).subscribe(
          (res: any) => {
            console.log(res);
            console.log("carro eliminado de lista de reportados");
          },
          (error: any) => {
            console.error('validating reported car with id: ', id);
          }
        );
      } else {
        console.log("cancelar validacion");
      }
    });
  }

}
