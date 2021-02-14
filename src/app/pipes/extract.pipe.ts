import { Pipe, PipeTransform } from '@angular/core';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from '../core/interfaces/auto-semi-nuevo';

@Pipe({
  name: 'extract',
})
export class ExtractPipe implements PipeTransform {
  transform(value: SponsoredCar[], what?: string): AutoSemiNuevo[] {
    if (what) {
      if (what === 'semiNuevo') {
        console.log('hola');
        let res = value.map((elem: SponsoredCar) => elem.autoSemiNuevo);
        console.log(res);
        return res;
      }
    }
    return [];
  }
}
