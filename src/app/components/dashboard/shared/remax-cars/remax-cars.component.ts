import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SortType } from 'src/app/core/enums/sort-type.enum';
import { InteresadoReventa } from 'src/app/core/interfaces/interesado-reventa';
import { CommonService } from 'src/app/core/services/common.service';
import { Pagination } from 'src/app/core/superclasses/pagination';

@Component({
  selector: 'app-remax-cars',
  templateUrl: './remax-cars.component.html',
  styleUrls: ['./remax-cars.component.css'],
})
export class RemaxCarsComponent
  extends Pagination
  implements OnInit, OnChanges
{
  @Input() name!: string;
  @Input() interestedCarros!: InteresadoReventa[];

  filteredInterestedCarros!: InteresadoReventa[];
  @Output() removeInteresado = new EventEmitter<number>();

  // * responsive
  list: boolean;
  len: number = 0;

  constructor(private commonService: CommonService) {
    super();
    if (this.commonService.screenWidth <= 1060) {
      this.list = false;
    } else {
      this.list = true;
    }

    this.commonService.changeLayoutEvent.subscribe(() => {
      this.changeGridView('grid');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.interestedCarros &&
      this.interestedCarros &&
      this.interestedCarros.length > 0
    ) {
      this.filteredInterestedCarros = this.interestedCarros;
      this.len = this.filteredInterestedCarros.length;
      super.updatePagination(this.len);
    }
  }

  ngOnInit(): void {}

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredInterestedCarros = this.interestedCarros.filter(
      (interesado: InteresadoReventa) => {
        return (
          this._normalizeValue(interesado.autoSemiNuevo.marca).includes(
            normalizedQuery
          ) ||
          this._normalizeValue(interesado.autoSemiNuevo.modelo).includes(
            normalizedQuery
          )
        );
      }
    );
    this.len = this.filteredInterestedCarros.length;
    super.updatePagination(this.len);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  sortBy(e: any): void {
    const by: string = e.target.value;

    switch (by) {
      case SortType.PrecioMenorMayor: {
        this.interestedCarros.sort(
          (a: InteresadoReventa, b: InteresadoReventa) => {
            return a.autoSemiNuevo.precioVenta - b.autoSemiNuevo.precioVenta;
          }
        );
        break;
      }
      case SortType.PrecioMayorMenor: {
        this.interestedCarros.sort(
          (a: InteresadoReventa, b: InteresadoReventa) => {
            return b.autoSemiNuevo.precioVenta - a.autoSemiNuevo.precioVenta;
          }
        );
        break;
      }
      case SortType.AnoMenorMayor: {
        this.interestedCarros.sort(
          (a: InteresadoReventa, b: InteresadoReventa) => {
            return (
              a.autoSemiNuevo.anoFabricacion - b.autoSemiNuevo.anoFabricacion
            );
          }
        );
        break;
      }
      case SortType.AnoMayorMenor: {
        this.interestedCarros.sort(
          (a: InteresadoReventa, b: InteresadoReventa) => {
            return (
              b.autoSemiNuevo.anoFabricacion - a.autoSemiNuevo.anoFabricacion
            );
          }
        );
        break;
      }
    }
  }

  removeInterested(id: number): void {
    this.removeInteresado.emit(id);
  }
}
