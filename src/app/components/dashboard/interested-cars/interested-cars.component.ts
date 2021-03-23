import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { InteresadoReventa } from 'src/app/core/interfaces/interesado-reventa';

@Component({
  selector: 'app-interested-cars',
  templateUrl: './interested-cars.component.html',
  styleUrls: ['./interested-cars.component.css']
})
export class InterestedCarsComponent implements OnInit {

  correo: string | null;
  
  constructor(
    private userService: UserService,
    private storageService: StorageService,
  ) {
    this.correo = this.storageService.getEmailLocalStorage();
  }

  ngOnInit(): void {

    // ALERT: cuidado con que correo sea null
    this.userService.getAutosInteresantes(this.correo!).subscribe(
      (response: InteresadoReventa[]) => {
        console.group('Autos Interesantes');
        console.log(response);
        console.groupEnd();
      },
      (error: any) => {
        console.error('fetching carros marcados como interesantes:', error);
      }
    );

  }

}
