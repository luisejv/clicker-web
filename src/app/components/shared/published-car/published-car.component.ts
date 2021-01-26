import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-published-car',
  templateUrl: './published-car.component.html',
  styleUrls: ['./published-car.component.css']
})
export class PublishedCarComponent implements OnInit {
  @Input() name!: string;
  @Input() photo!: string;
  @Input() price!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
