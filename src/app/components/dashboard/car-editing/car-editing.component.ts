import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-editing',
  templateUrl: './car-editing.component.html',
  styleUrls: ['./car-editing.component.css']
})
export class CarEditingComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  editCar(auto: AutoSemiNuevo): void {
    console.log('editCar: ', {auto});
    this.userService.putAutoSemiNuevo(auto).subscribe(
      (res: any) => {
        console.log('edit car response: ', {res});
        Swal.fire({
          icon: 'success',
          title: '¡El carro ha sido actualizado!',
          showConfirmButton: true,
        }).then(() => {
          this.router.navigateByUrl('/dashboard/publicados-carros');
        });
      },
      (err: any) => {
        console.log('when editing car: ', {err});
        Swal.fire({
          icon: 'error',
          title: '¡Ocurrió un error!',
          text: 'Inténtalo nuevamente.',
          showConfirmButton: true,
        })
      }
    );
  }

}
