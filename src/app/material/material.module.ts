import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const AngularMaterial = [
  MatButtonModule
]

@NgModule({
  imports: [AngularMaterial],
  exports: [AngularMaterial],
})
export class MaterialModule { }
