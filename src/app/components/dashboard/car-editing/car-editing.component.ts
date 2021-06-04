import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-editing',
  templateUrl: './car-editing.component.html',
  styleUrls: ['./car-editing.component.css'],
})
export class CarEditingComponent implements OnInit {
  role: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.role = this.storageService.getRoleLocalStorage()!;
  }

  ngOnInit(): void {}

  editCar(auto: AutoSemiNuevo): void {
    console.log('editCar: ', { auto });
    this.userService.putAutoSemiNuevo(auto).subscribe(
      (res: any) => {
        console.log('edit car response: ', { res });
        Swal.fire({
          icon: 'success',
          title: '¡El auto ha sido actualizado!',
          showConfirmButton: true,
        }).then(() => {
          if (this.role === RolesEnum.ADMIN) {
            this.router.navigateByUrl('/dashboard/autos-por-validar');
          } else {
            this.router.navigateByUrl('/dashboard/publicados-autos');
          }
        });
      },
      (err: any) => {
        console.log('when editing car: ', { err });
        Swal.fire({
          icon: 'error',
          title: '¡Ocurrió un error!',
          text: 'Inténtalo nuevamente.',
          showConfirmButton: true,
        });
      }
    );
  }
}
