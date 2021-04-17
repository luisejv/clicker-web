import { Component, OnInit } from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';

@Component({
  selector: 'app-car-editing',
  templateUrl: './car-editing.component.html',
  styleUrls: ['./car-editing.component.css']
})
export class CarEditingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editCar(auto: AutoSemiNuevo): void {
    console.log('editCar: ', {auto});
  }

}
