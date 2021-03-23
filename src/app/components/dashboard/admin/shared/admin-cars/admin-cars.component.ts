import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { AdminService } from 'src/app/core/services/admin.service';
import { CommonService } from 'src/app/core/services/common.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit, OnChanges {
  // TODO: @Input() para setear el número de carros por página

  @Input() name!: string;

  @Input() validationView: boolean = false;
  @Input() reportedView: boolean = false;
  @Input() interestingView: boolean = false;

  @Input() notValidatedCars: AutoSemiNuevo[] = [];
  @Input() reportedCars: AutoReportado[] = [];
  @Input() interestingCars: AutoInteresado[] = [];

  @Output() validate = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() reportedIsValid = new EventEmitter<number>();
  @Output() mostrarReportadores = new EventEmitter<AutoReportado>();
  @Output() mostrarVentaDetails = new EventEmitter<AutoInteresado>();

  list: boolean;
  len: number = 0;

  // * carros
  reportedCarros: AutoReportado[] = [];
  reportedFilteredCarros: AutoReportado[] = [];

  notValidatedCarros: AutoSemiNuevo[] = [];
  notValidatedFilteredCarros: AutoSemiNuevo[] = [];

  interestingCarros: AutoInteresado[] = [];
  interestingFilteredCarros: AutoInteresado[] = [];

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 10;

  constructor(
    private loaderService: LoaderService,
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
    console.group('ngOnChanges');
    console.dir(changes);
    console.groupEnd();
    
    if (changes.notValidatedCars && this.notValidatedCars.length > 0) {

      this.notValidatedCarros = this.notValidatedCars;
      this.notValidatedFilteredCarros = this.notValidatedCarros;
      this.len = this.notValidatedFilteredCarros.length;

    } else if (changes.reportedCars && this.reportedCars.length > 0) {

      this.reportedCarros = this.reportedCars;
      this.reportedFilteredCarros = this.reportedCarros;
      this.len = this.reportedFilteredCarros.length;

    } else if (changes.interestingCars && this.interestingCars.length > 0) {

      this.interestingCarros = this.interestingCars;
      this.interestingFilteredCarros = this.interestingCarros;
      this.len = this.interestingFilteredCarros.length;

    }
  }

  ngOnInit(): void {}

  validateCar(id: number): void {
    this.validate.emit(id);
  }

  removeCar(id: number): void {
    this.remove.emit(id);
  }

  markAsValid(id: number): void {
    this.reportedIsValid.emit(id);
  }

  showReporters(auto: AutoReportado): void {
    this.mostrarReportadores.emit(auto);
  }

  sellCar(auto: AutoInteresado): void {
    this.mostrarVentaDetails.emit(auto);
  }

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    if (this.validationView) {
      this.notValidatedFilteredCarros = this.notValidatedCarros.filter(
        (carro: AutoSemiNuevo) => {
          //TODO: añadir más propiedades? (año, kilometraje, etc)
          return (
            this._normalizeValue(carro.marca).includes(normalizedQuery) ||
            this._normalizeValue(carro.modelo).includes(normalizedQuery)
          );
        }
      );
      this.len = this.notValidatedFilteredCarros.length;
    } else if (this.reportedView) {
      this.reportedFilteredCarros = this.reportedCarros.filter(
        (carro: AutoReportado) => {
          //TODO: añadir más propiedades? (año, kilometraje, etc)
          return (
            this._normalizeValue(carro.marca).includes(normalizedQuery) ||
            this._normalizeValue(carro.modelo).includes(normalizedQuery)
          );
        }
      );
      this.len = this.reportedFilteredCarros.length;
    } else if (this.interestingView) {
      this.interestingFilteredCarros = this.interestingCarros.filter(
        (carro: AutoInteresado) => {
          //TODO: añadir más propiedades? (año, kilometraje, etc)
          return (
            this._normalizeValue(carro.auto.modelo).includes(normalizedQuery) ||
            this._normalizeValue(carro.auto.modelo).includes(normalizedQuery)
          );
        }
      );
    }
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
  }

  goToPage(pageId: number): void {
    this.currPage = pageId;
    //FIXME: este scrollTo da chongos en la vista de iPad
    window.scrollTo(0, 0);
  }

}
