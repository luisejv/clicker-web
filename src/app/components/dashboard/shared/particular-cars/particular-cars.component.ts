import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { CommonService } from 'src/app/core/services/common.service';
import { SortType } from 'src/app/core/enums/sort-type.enum';
import { Pagination } from 'src/app/core/superclasses/pagination';

@Component({
  selector: 'app-particular-cars',
  templateUrl: './particular-cars.component.html',
  styleUrls: ['./particular-cars.component.css'],
})
export class ParticularCarsComponent
  extends Pagination
  implements OnInit, OnChanges
{
  @Input() particularPublishedView!: boolean;
  @Input() name!: string;
  @Input() carros!: AutoSemiNuevo[];
  filteredCarros: AutoSemiNuevo[] = [];

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
    console.log('changes occureed: ', changes);
    console.log(this.carros);
    if (changes.carros && this.carros && this.carros.length > 0) {
      this.filteredCarros = this.carros;
      this.len = this.filteredCarros.length;
      super.updatePagination(this.len);
    }
  }

  ngOnInit(): void {}

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    console.log('query: ', normalizedQuery);
    this.filteredCarros = this.carros.filter((carro: AutoSemiNuevo) => {
      return (
        this._normalizeValue(carro.marca).includes(normalizedQuery) ||
        this._normalizeValue(carro.modelo).includes(normalizedQuery)
      );
    });
    this.len = this.filteredCarros.length;
    super.updatePagination(this.filteredCarros.length);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private filterCars(byPrice: boolean, ascending: boolean) {
    if (byPrice) {
      if (ascending) {
        this.filteredCarros.sort((a: AutoSemiNuevo, b: AutoSemiNuevo) => {
          return a.precioVenta - b.precioVenta;
        });
      } else {
        this.filteredCarros.sort((a: AutoSemiNuevo, b: AutoSemiNuevo) => {
          return b.precioVenta - a.precioVenta;
        });
      }
    } else {
      if (ascending) {
        this.filteredCarros.sort((a: AutoSemiNuevo, b: AutoSemiNuevo) => {
          return a.anoFabricacion - b.anoFabricacion;
        });
      } else {
        this.filteredCarros.sort((a: AutoSemiNuevo, b: AutoSemiNuevo) => {
          return b.anoFabricacion - a.anoFabricacion;
        });
      }
    }
  }

  sortBy(e: any): void {
    const by: string = e.target.value;

    switch (by) {
      case SortType.PrecioMenorMayor: {
        console.log('precio ascendiente');
        this.filterCars(true, true);
        break;
      }
      case SortType.PrecioMayorMenor: {
        console.log('precio descendiente');
        this.filterCars(true, false);
        break;
      }
      case SortType.AnoMenorMayor: {
        console.log('precio ascendiente');
        this.filterCars(false, true);
        break;
      }
      case SortType.AnoMayorMenor: {
        console.log('precio descendiente');
        this.filterCars(false, false);
        break;
      }
      default: {
        console.warn('unknown sort type');
      }
    }
  }
}
