import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-published-car',
  templateUrl: './published-car.component.html',
  styleUrls: ['./published-car.component.css']
})
export class PublishedCarComponent implements OnInit {
  @Input() name?: string;
  @Input() photo?: string;
  @Input() price?: number;

  constructor() {
    this.name = this.getName();
    this.photo = this.getPhoto();
    this.price = this.getPrice();
  }

  ngOnInit(): void {
  }

  getPrice(): number {
    return typeof this.price != 'undefined' ? this.price : 0;
  }

  getName(): string {
    return typeof this.name != 'undefined' ? this.name : 'Sin Nombre';
  }

  getPhoto(): string {
    return typeof this.photo != 'undefined' ? this.photo : '...';
  }

}
