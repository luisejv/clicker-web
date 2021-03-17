import { Component, OnInit } from '@angular/core';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-car-interest',
  templateUrl: './car-interest.component.html',
  styleUrls: ['./car-interest.component.css']
})
export class CarInterestComponent implements OnInit {

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {

    this.adminService.getCarrosInteresados().subscribe(
      (response: AutoInteresado[]) => {
        console.group('Carros Interesados');
        console.dir(response);
        console.groupEnd();
      },
      (error: any) => {
        console.error('when fetching carros interesados: ', error);
      }
    );

  }

}
