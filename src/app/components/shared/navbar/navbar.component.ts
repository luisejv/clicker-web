import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { StorageService } from 'src/app/core/services/storage.service';
declare var $: any;
declare var slidebars: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  ruta: string;

  constructor(private storageService: StorageService, private router: Router) {
    if (this.storageService.isLoggedIn()) {
     this.ruta = '/dashboard/registrar-carro';
    } else {
      this.ruta = '/registro/particular';
    }
  }

  ngOnInit(): void {
    /* controller.init();
    var controller = new slidebars();
    $( '.js-toggle-mobile-slidebar' ).on( 'click',  ( event:any ) => {
      event.stopPropagation();
      controller.toggle( 'mobile-slidebar' );
    } ); */
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
  }
}
