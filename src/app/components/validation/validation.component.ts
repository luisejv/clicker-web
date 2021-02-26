import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  validationFormGroup: FormGroup;
  encryptedId!: string;
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.validationFormGroup = this.fb.group({
      nombre: '',
      telefono: '',
    });
  }

  ngOnInit(): void {
    this.encryptedId = this.router.url.split('validation/')[1];
    console.log(this.encryptedId);
  }

  validate(): void {
    const body = {
      correo: this.encryptedId,
      nombre: this.validationFormGroup.value.nombre,
      numTelefono: this.validationFormGroup.value.telefono,
    };
    this.userService.validateEmail(body).subscribe(
      (response) => {
        Swal.fire({
          title: 'Validado correctamente!',
          html: 'Tu cuenta ha sido validada con éxito',
          allowOutsideClick: true,
          icon: 'success',
          showConfirmButton: true,
        }).then(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
