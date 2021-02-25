import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
declare var $: any;
declare var slidebars: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    /* controller.init();
    var controller = new slidebars();
    $( '.js-toggle-mobile-slidebar' ).on( 'click',  ( event:any ) => {
      event.stopPropagation();
      controller.toggle( 'mobile-slidebar' );
    } ); */
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  logout(): void {
    console.log('Logging Out!');
    this.storageService.removeEmailLocalStorage();
    this.storageService.removeRoleFromLocalStorage();
  }

  checkToRegister(): string {
    if (this.storageService.isLoggedIn()) {
      return '/dashboard/registrar-carro';
    } else {
      return '/registro/particular';
    }
  }
}
