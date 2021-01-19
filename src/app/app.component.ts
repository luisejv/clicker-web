import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonService } from './core/common.service';
declare var $: any;
/* import * as $ from 'jquery'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  show: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    public commonService: CommonService,
  ) { };

  ngOnInit() {
    /* .pipe(filter(event => event instanceof NavigationStart)) */
    /* .pipe(map(() => this.activatedRoute)) */
    this.router.events
      .subscribe((event: any) => {
        console.log("prueba");
        var $preloader = $( '#page-preloader' ),
        $spinner = $preloader.find( '.spinner' );
        $spinner.fadeIn();
        $preloader.fadeIn();
        $.getScript('assets/js/custom.js');
      });
  }

  inDashboard(): boolean {
    console.log(`[INFO]: ${this.router.url}`);
    return this.router.url.includes('dashboard');
  }

  onResize(event: any): void {
    this.commonService.getScreenSize(event);
  }

}