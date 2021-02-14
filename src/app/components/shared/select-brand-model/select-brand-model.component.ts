import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-brand-model',
  templateUrl: './select-brand-model.component.html',
  styleUrls: ['./select-brand-model.component.css'],
})
export class SelectBrandModelComponent implements OnInit {
  @Input() marca!: string;
  @Input() modelos!: string[];
  @Input() marcas!: string[];

  @Output() marcaChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  marcaChange(e: any): void {
    this.marcaChanged.emit(e.target.value);
  }

  modeloChanged(e: any): void {
    console.log(e.target.value);
  }

  changeCarMaxPrice(e: any): void {
    // let maxPrice: number = e.target.value;
  }
}
