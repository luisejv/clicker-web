import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Incidence } from 'src/app/core/interfaces/incidence';
import { User } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-incidence',
  templateUrl: './report-incidence.component.html',
  styleUrls: ['./report-incidence.component.css'],
})
export class ReportIncidenceComponent implements OnInit {
  incidenceFormGroup: FormGroup;
  file!: FileList;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorage: StorageService,
    private router: Router
  ) {
    this.incidenceFormGroup = this.fb.group({
      asunto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      adjunto: ['', [Validators.required]],
    });
  }

  uploadIncidence(): void {
    const body: Incidence = {
      usuario: {
        id: this.localStorage.getIdLocalStorage()!,
      },
      asunto: this.incidenceFormGroup.value.asunto,
      tipo: this.incidenceFormGroup.value.tipo,
      descripcion: this.incidenceFormGroup.value.descripcion,
      foto: this.incidenceFormGroup.value.adjunto,
      date: new Date(),
    };
    const bodyForm = new FormData();
    bodyForm.set('file', this.file && this.file.length > 0 ? this.file[0] : '');
    bodyForm.set('incidencias', JSON.stringify(body));
    console.log(bodyForm.get('file'));
    this.userService.postIncidence(bodyForm).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enviado!',
          text: 'Se envió la incidencia, un administrador la revisará y te contactará de ser necesario.',
          showConfirmButton: true,
        }).then(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Hubo un error actualizando su información, por favor inténtelo más tarde.',
          showConfirmButton: true,
        });
      }
    );
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.incidenceFormGroup.patchValue({
          file: reader.result,
        });
      };
    }
  }

  ngOnInit(): void {}
}
