import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Retiro } from 'src/app/core/interfaces/withdrawal';
import { AdminService } from 'src/app/core/services/admin.service';
import { StorageService } from 'src/app/core/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdrawal-requests',
  templateUrl: './withdrawal-requests.component.html',
  styleUrls: ['./withdrawal-requests.component.css'],
})
export class WithdrawalRequestsComponent implements OnInit {
  dataSource!: MatTableDataSource<Retiro>;
  columnsToDisplay = ['index', 'date', 'user', 'value', 'tranfer', 'actions'];
  transferencia: string = '';

  constructor(
    private adminService: AdminService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.adminService.getSolicitudesRetiro().subscribe(
      (response: Retiro[]) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        console.log('Error getting requests: ', error);
      }
    );
  }

  putTransference(element: Retiro, type: boolean): void {
    let body: any = {
      id: element.id,
      admin: {
        email: this.storageService.getEmailLocalStorage()!,
      },
      aceptado: type,
    };
    if (this.transferencia != '' && type) {
      body.transferencia = this.transferencia;
      this.adminService.validateSolicitudRetiro(body).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Validado!',
            icon: 'success',
            html:
              'Solicitud validada correctamente, se deducirá el monto del balance del usuario.',
            showConfirmButton: true,
          });
        },
        (error: any) => {
          Swal.fire({
            title: 'Oops!',
            icon: 'error',
            html: 'Hubo un fallo en el servidor, por favor intenta más tarde.',
            showConfirmButton: true,
          });
          console.log('Error processing request: ', error);
        }
      );
    } else if (this.transferencia == '' && type) {
      Swal.fire({
        title: 'Oops!',
        icon: 'warning',
        html:
          'Para validar el pago debes especificar el número de transferencia realizado.',
        showConfirmButton: true,
      });
    } else {
      this.adminService.validateSolicitudRetiro(body).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Cancelado!',
            icon: 'success',
            html: 'Solicitud cancelada correctamente.',
            showConfirmButton: true,
          });
        },
        (error: any) => {
          Swal.fire({
            title: 'Oops!',
            icon: 'error',
            html: 'Hubo un fallo en el servidor, por favor intenta más tarde.',
            showConfirmButton: true,
          });
          console.log('Error processing request: ', error);
        }
      );
    }
  }
}
