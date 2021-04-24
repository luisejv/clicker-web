import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { InteresadoReventa } from 'src/app/core/interfaces/interesado-reventa';
import { CommonService } from 'src/app/core/services/common.service';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';

@Component({
  selector: 'app-interested-cars',
  templateUrl: './interested-cars.component.html',
  styleUrls: ['./interested-cars.component.css']
})
export class InterestedCarsComponent implements OnInit {

  carros!: InteresadoReventa[];
  correo: string | null;
  
  constructor(
    private userService: UserService,
    private storageService: StorageService,
  ) {
    this.correo = this.storageService.getEmailLocalStorage();
    console.warn(this.correo);
  }

  ngOnInit(): void {

    // ALERT: cuidado con que correo sea null
    this.userService.getAutosInteresantes(this.correo!).subscribe(
      (response: InteresadoReventa[]) => {
        console.group('Autos Interesantes');
        console.log(response);
        console.groupEnd();
        this.carros = response;
      },
      (error: any) => {
        console.error('fetching carros marcados como interesantes:', error);
      }
    );

  }

  removeInterestedMark(id: number): void {
    console.log('desmarcar carro con id: ', id);
    this.userService.removeAutoFromInteresantes(id).subscribe(
      (response: any) => {
        console.group('Desmarcar como Interesado response');
        console.log(response);
        console.groupEnd();
        this.ngOnInit();
      },
      (error: any) => {
        console.error('when marking car with id ', id, ' as not interesting: ', error);
      }
    );
  }

}
