import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { StorageService } from 'src/app/core/services/storage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('rightLeftAnimation', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('0.2s ease-in-out', style({ width: 265, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ width: 265, opacity: 1 }),
        animate('0.2s ease-in-out', style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  ruta: string;
  showSidebar = false;
  isAdmin: boolean = false;

  constructor(private storageService: StorageService, private router: Router) {
    if (this.storageService.isLoggedIn()) {
      this.ruta = '/dashboard/registrar-auto';
    } else {
      this.ruta = '/auth';
    }
    this.isAdmin =
      this.storageService.getRoleLocalStorage() === RolesEnum.ADMIN;
  }

  ngOnInit(): void {
    /* controller.init();
    var controller = new slidebars();
    $( '.js-toggle-mobile-slidebar' ).on( 'click',  ( event:any ) => {
      event.stopPropagation();
      controller.toggle( 'mobile-slidebar' );
    } ); */
  }

  toggle(): void {
    this.showSidebar = !this.showSidebar;
  }

  goToCarsSubset(subset: string): void {
    const body: CarSearchFilter = {
      carSubset: subset,
    };
    this.router
      .navigateByUrl('/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/inventory-listings'], { queryParams: body });
      });
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  logout(): void {
    console.log('Logging Out!');
    this.storageService.removeEmailLocalStorage();
    this.storageService.removeRoleFromLocalStorage();
    this.storageService.removeTokenLocalStorage();
    this.storageService.removeValidatedLocalStorage();
    this.storageService.removeIdLocalStorage();
    this.storageService.removeDniLocalStorage();
    this.storageService.removeNombreLocalStorage();
    this.storageService.removeApellidosLocalStorage();
  }
}
