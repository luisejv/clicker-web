import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var slidebars: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /* controller.init();
    var controller = new slidebars();
    $( '.js-toggle-mobile-slidebar' ).on( 'click',  ( event:any ) => {
      event.stopPropagation();
      controller.toggle( 'mobile-slidebar' );
  } ); */
  }

}
