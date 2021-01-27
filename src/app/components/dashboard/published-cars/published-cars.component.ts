import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { ModesEnum } from 'src/app/core/interfaces/modes.enum';
import { User } from 'src/app/core/interfaces/user';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-published-cars',
  templateUrl: './published-cars.component.html',
  styleUrls: ['./published-cars.component.css'],
})
export class PublishedCarsComponent implements OnInit {
  @Input() mode!: ModesEnum;
  @Input() filters!: CarSearchFilter;

  // * user
  correo: string = '';

  // * cars
  carros: AutoSemiNuevo[] = [];
  filteredCarros: AutoSemiNuevo[] = [];

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 10;

  // * ngs slider
  minPrice: number = 1000;
  maxPrice: number = 50000;
  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    step: 1000,
    translate: (value: number, label: LabelType): string => {
      this.filteredCarros = this.carros.filter((carro: AutoSemiNuevo) => {
        return (
          carro.precioVenta >= this.minPrice &&
          carro.precioVenta <= this.maxPrice
        );
      });
      this.currPage = 0;
      this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
      this.pages = Array(this.pgCnt)
        .fill(this.pgCnt)
        .map((x: any, i: any) => i);
      return '';
    },
  };

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    if (this.mode === ModesEnum.DASHBOARD) {
      // ! cuidado con esto
      this.correo = this.storageService.getEmailSessionStorage()!; // 😬
      this.userService
        .getAutosSemiNuevosValidadosUserUrl(this.correo)
        .subscribe(
          (res: User) => {
            // ! cuidado con el '!'
            const response: AutoSemiNuevo[] = res.carrosPosteados!;

            this.pgCnt = Math.ceil(response.length / 10);
            this.pages = Array(this.pgCnt)
              .fill(this.pgCnt)
              .map((x: any, i: any) => i);

            this.carros = response;
            this.filteredCarros = response;

            console.group('Autos Semi Nuevos response');
            console.log(response);
            console.groupEnd();
          },
          (error: any) => {
            console.group('Error');
            console.error('In pubished-cars.component:');
            console.error(error);
            console.groupEnd();
          }
        );
    } else if (this.mode === ModesEnum.USER_SEARCH) {
      //TODO: usar el this.filters!.carSubset ('all', 'new', 'used')

      this.userService.getAutosSemiNuevosValidados().subscribe(
        (response: AutoSemiNuevo[]) => {
            this.carros = response;

            console.log('buenos dias carajo');

            this.filteredCarros = response.filter((carro: AutoSemiNuevo) => {
              return (
                carro.auto.marca! === this.filters!.carBrand &&
                carro.auto.modelo! === this.filters!.carModel &&
                carro.precioVenta <= this.filters!.carMaxPrice 
                // && carro.auto.tipocarroceria === this.filters!.carType
              );
          });

          this.pgCnt = Math.ceil(response.length / 10);
            this.pages = Array(this.pgCnt)
              .fill(this.pgCnt)
              .map((x: any, i: any) => i);

          this.maxPrice = this.filters!.carMaxPrice;
          // ? actualizar más filtros?
        },
        (error: any) => {
          console.error(
            'when fetching all semi nuevos validados in published-car.component.ts: ',
            error
          );
        }
      );
      
    } else {
      console.error('Unknown mode passed to published-cars.component.ts');
    }
  }

  ngOnInit(): void {}

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredCarros = this.carros.filter((carro: any) => {
      return this._normalizeValue(carro.name).includes(normalizedQuery);
    });
    this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
    this.pages = Array(this.pgCnt)
      .fill(this.pgCnt)
      .map((x: any, i: any) => i);
    this.currPage = 0;
  }

  goToPage(pageId: number): void {
    this.currPage = pageId;
  }

  sortBy(order: any): void {
    console.group(order.target.value);
    console.groupEnd();
    //TODO: sort por algun criterio
  }

  resetFilters(): void {
    this.filteredCarros = this.carros;
  }
}
