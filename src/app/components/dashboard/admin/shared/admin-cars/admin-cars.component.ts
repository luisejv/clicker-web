import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { AdminService } from 'src/app/core/services/admin.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit, OnChanges {
  @Input() name!: string;
  @Input() validationView: boolean = false;
  @Input() reportedView: boolean = false;
  @Input() notValidatedCars: AutoSemiNuevo[] = [];
  @Input() reportedCars: AutoReportado[] = [];

  @Output() validate = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() reportedIsValid = new EventEmitter<number>();
  @Output() mostrarReportadores = new EventEmitter<AutoReportado>();

  /*
   * replicar el evento para (validar) y (reportar)
   * copiar la funcion de (validar) a car-validation.component
   * hacer el map para transformar cuando se este lidiando con AutoReportado
  */

  list: boolean = true;
  len: number = 0;

  // * carros
  reportedCarros: AutoReportado[] = [];
  reportedFilteredCarros: AutoReportado[] = [];
  notValidatedCarros: AutoSemiNuevo[] = [];
  notValidatedFilteredCarros: AutoSemiNuevo[] = [];

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 10;

  constructor(
    private loaderService: LoaderService,
    private adminService: AdminService,
  ) { }

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
    } else {
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
    window.scrollTo(0, 0);
  }

}
