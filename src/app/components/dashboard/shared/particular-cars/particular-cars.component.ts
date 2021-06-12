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

@Component({
  selector: 'app-particular-cars',
  templateUrl: './particular-cars.component.html',
  styleUrls: ['./particular-cars.component.css'],
})
export class ParticularCarsComponent implements OnInit, OnChanges {
  @Input() particularPublishedView!: boolean;
  @Input() name!: string;
  @Input() carros!: AutoSemiNuevo[];
  filteredCarros: AutoSemiNuevo[] = [];

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 9;

  // * responsive
  list: boolean;
  len: number = 0;

  constructor(private commonService: CommonService) {
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
    this.updatePagination();
  }

  private updatePagination(): void {
    this.currPage = 0;
    this.pgCnt = Math.ceil(this.len / 10);
    this.pages = Array(this.pgCnt)
      .fill(this.pgCnt)
      .map((x: any, i: any) => i);
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

  goToPage(pageId: number): void {
    this.currPage = pageId;
    //FIXME: este scrollTo da chongos en la vista de iPad
    window.scrollTo(0, 0);
  }
}
