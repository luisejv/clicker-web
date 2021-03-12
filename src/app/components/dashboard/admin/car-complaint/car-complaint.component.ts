import { Component, OnInit } from '@angular/core';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { AdminService } from 'src/app/core/services/admin.service';
import Swal from 'sweetalert2';

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

  removeCar(id: number): void {
    //TODO
    console.log("remover carro denunciado con id: ", id);
  }

  markAsValid(id: number): void {
    //TODO
    console.log("marcar carro reportado como válido con id: ", id);
  }

}
