import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestPaymentComponent {
  cantidad!: number;
  balance!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<RequestPaymentComponent>,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  requestPayment(): void {
    let body = {
      usuario: {
        correo: this.storageService.getEmailLocalStorage(),
      },
      monto: this.cantidad,
    };
    this.userService.postSolicitudRetiro(body).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Enviado!',
          icon: 'success',
          html:
            'Solicitud enviada exitosamente, un administrador revisará y validará su solicitud.',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      },
      (error: any) => {
        if (error.status == 406) {
          Swal.fire({
            title: 'Fondos Insuficientes',
            icon: 'error',
            html:
              'La cantidad que desea retirar excede el balance que tiene actualmente.',
            showConfirmButton: true,
          });
          this.dialogRef.close();
        } else if (error.status == 423) {
          this.userService
            .getSolicitudRetiro(this.storageService.getEmailLocalStorage()!)
            .subscribe(
              (response: any) => {
                console.log(response);
                Swal.fire({
                  title: 'Oops!',
                  icon: 'warning',
                  html: `Existe una solicitud de retiro vigente por ${response.monto} que no ha sido validada aún. Si desea, puede eliminar la solicitud anterior y solicitar la actual.`,
                  confirmButtonText: 'Volver sin cambios',
                  denyButtonText: 'Eliminar solicitud anterior',
                  showDenyButton: true,
                  showConfirmButton: true,
                }).then((result) => {
                  if (result.isDenied) {
                    Swal.fire({
                      title: 'Loading Data',
                      width: 300,
                      padding: '2rem',
                      didOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    this.userService
                      .deleteSolicitudRetiro(Number(response.id))
                      .subscribe(
                        (response: any) => {
                          console.log(response);
                          this.userService.postSolicitudRetiro(body).subscribe(
                            (response: any) => {
                              console.log(response);
                              Swal.close();
                              Swal.fire({
                                title: 'Enviado!',
                                icon: 'success',
                                html:
                                  'Solicitud enviada exitosamente, un administrador revisará y validará su solicitud.',
                                showConfirmButton: true,
                              });
                              this.dialogRef.close();
                            },
                            (error: any) => {
                              Swal.close();
                              Swal.fire({
                                title: 'Oops!',
                                icon: 'error',
                                html:
                                  'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
                                showConfirmButton: true,
                              });
                              console.log('Error processing request: ', error);
                              this.dialogRef.close();
                            }
                          );
                        },
                        (error) => {
                          Swal.close();
                          Swal.fire({
                            title: 'Oops!',
                            icon: 'error',
                            html:
                              'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
                            showConfirmButton: true,
                          });
                          console.log('Error processing request: ', error);
                          this.dialogRef.close();
                        }
                      );
                  }
                });
              },
              (error) => {
                Swal.fire({
                  title: 'Oops!',
                  icon: 'error',
                  html:
                    'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
                  showConfirmButton: true,
                });
                console.log('Error processing request: ', error);
                this.dialogRef.close();
              }
            );
        } else {
          Swal.fire({
            title: 'Oops!',
            icon: 'error',
            html:
              'Hubo un fallo en el servidor, por favor intenta más tarde. Si el problema persiste, contacta con un administrador.',
            showConfirmButton: true,
          });
          console.log('Error processing request: ', error);
          this.dialogRef.close();
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
