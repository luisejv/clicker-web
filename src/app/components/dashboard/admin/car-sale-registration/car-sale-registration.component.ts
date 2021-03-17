import { Component, OnInit } from '@angular/core';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-car-sale-registration',
  templateUrl: './car-sale-registration.component.html',
  styleUrls: ['./car-sale-registration.component.css']
})
export class CarSaleRegistrationComponent implements OnInit {

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {

    this.adminService.getCarrosInteresados().subscribe(
      (response: AutoInteresado[]) => {
        console.group('Autos Interesados');
        console.dir(response);
        console.groupEnd();
      },
      (error: any) => {
        console.error('when fetching carros interesados: ', error);
      }
    );

  }

}
