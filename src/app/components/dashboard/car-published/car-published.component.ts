import { Component, OnInit } from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { User } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-car-published',
  templateUrl: './car-published.component.html',
  styleUrls: ['./car-published.component.css']
})
export class CarPublishedComponent implements OnInit {

  carros!: AutoSemiNuevo[]; 
  correo: string | null;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
  ) {
    this.correo = this.storageService.getEmailLocalStorage();
  }

  ngOnInit(): void {

    this.userService.getAutosSemiNuevosValidadosUserUrl(this.correo!).subscribe(
      (res: User) => {
        this.carros = res.carrosPosteados!;
        console.log('published cars: ', {autos: res});
      },
      (err: any) => {
        console.log('fetching carros publicados');
      }
    );

  }

}
