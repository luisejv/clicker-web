import { OnInit, Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private renderer: Renderer2, private el: ElementRef) { };

  title = 'client';
  visible = true;
  ngOnInit(){
  }
}