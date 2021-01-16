import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const AngularMaterial = [
  MatButtonModule,
  MatInputModule
]

@NgModule({
  imports: [AngularMaterial],
  exports: [AngularMaterial],
})
export class MaterialModule { }
