import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-auto-semi-nuevo',
  templateUrl: './auto-semi-nuevo.component.html',
  styleUrls: ['./auto-semi-nuevo.component.css'],
})
export class AutoSemiNuevoComponent implements OnInit {
  auto!: AutoSemiNuevo;
  loading: boolean = true;
  logged: boolean = false;
  isRemax: boolean = false;

  contactFormGroup: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    public storageService: StorageService,
    private fb: FormBuilder
  ) {
    this.logged = this.storageService.isLoggedIn();
    this.isRemax =
      this.storageService.getRoleSessionStorage() == RolesEnum.REMAX;
    this.contactFormGroup = this.fb.group({
      nombre: '',
      telefono: '',
      correo: '',
      descripcion: '',
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loaderService.setIsLoading(true);
    this.route.queryParams.subscribe((params) => {
      console.group('Params');
      console.log(params);
      console.groupEnd();
      if (params['id']) {
        this.userService.getAutoSemiNuevoById(params['id']).subscribe(
          (response: AutoSemiNuevo) => {
            console.group('AutoSemiNuevo por ID:');
            console.dir(response);
            console.groupEnd();
            this.auto = response;
            this.loading = false;
          },
          (error: any) => {
            console.group('Error fetching autoSemiNuevo por ID');
            console.error(error);
            console.groupEnd();
          }
        );
      } else {
        console.group('Entering detail view with no ID');
        //TODO: redirect user to home or make a guard
        console.groupEnd();
      }
      this.loaderService.setIsLoading(false);
    });
  }
}
