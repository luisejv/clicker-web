import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SortType } from 'src/app/core/enums/sort-type.enum';
import { InteresadoReventa } from 'src/app/core/interfaces/interesado-reventa';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-remax-cars',
  templateUrl: './remax-cars.component.html',
  styleUrls: ['./remax-cars.component.css']
})
export class RemaxCarsComponent implements OnInit, OnChanges {

  @Input() name!: string;
  @Input() interestedCarros!: InteresadoReventa[];

  filteredInterestedCarros!: InteresadoReventa[];
  @Output() removeInteresado = new EventEmitter<number>();

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 10;

  // * responsive
  list: boolean;
  len: number = 0;

  constructor(
    private commonService: CommonService,
  ) {
    if (this.commonService.screenWidth <= 1060) {
      this.list = false
    } else {
      this.list = true;
    }

    this.commonService.changeLayoutEvent.subscribe(
      () => {
        this.changeGridView('grid');
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.interestedCarros && this.interestedCarros && this.interestedCarros.length > 0) {
      this.filteredInterestedCarros = this.interestedCarros;
      this.len = this.filteredInterestedCarros.length;
    }
  }

  ngOnInit(): void {
  }

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredInterestedCarros = this.interestedCarros.filter((interesado: InteresadoReventa) => {
      return (
        this._normalizeValue(interesado.autoSemiNuevo.marca).includes(normalizedQuery) ||
        this._normalizeValue(interesado.autoSemiNuevo.modelo).includes(normalizedQuery)
      );
    });
    this.len = this.filteredInterestedCarros.length;
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
            return a.autoSemiNuevo.anoFabricacion - b.autoSemiNuevo.anoFabricacion;
          }
        );
        break;
      }
      case SortType.AnoMayorMenor: {
        this.interestedCarros.sort(
          (a: InteresadoReventa, b: InteresadoReventa) => {
            return b.autoSemiNuevo.anoFabricacion - a.autoSemiNuevo.anoFabricacion;
          }
        );
        break;
      }
    }

  }

  goToPage(pageId: number): void {
    this.currPage = pageId;
    //FIXME: este scrollTo da chongos en la vista de iPad
    window.scrollTo(0, 0);
  }

  removeInterested(id: number): void {
    this.removeInteresado.emit(id);
  }

}
