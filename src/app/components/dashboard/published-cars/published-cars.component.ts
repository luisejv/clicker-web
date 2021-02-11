import { LabelType, Options } from '@angular-slider/ngx-slider';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { ModesEnum } from 'src/app/core/enums/modes.enum';
import { User } from 'src/app/core/interfaces/user';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/core/services/data.service';
import { of } from 'rxjs';
import { convertToObject } from 'typescript';
import { AutoSemiNuevoComponent } from '../../details/auto-semi-nuevo/auto-semi-nuevo.component';

@Component({
  selector: 'app-published-cars',
  templateUrl: './published-cars.component.html',
  styleUrls: ['./published-cars.component.css'],
})
export class PublishedCarsComponent implements OnInit {
  @Input() mode: ModesEnum = ModesEnum.DASHBOARD;
  @Input() filters!: CarSearchFilter;

  @ViewChild('filtroMarca') filtroMarca: any;
  @ViewChild('filtroModelo') filtroModelo: any;
  @ViewChild('filtroCarroceria') filtroCarroceria: any;
  @ViewChild('filtroDesde') filtroDesde: any;
  @ViewChild('filtroHasta') filtroHasta: any;
  @ViewChild('filtroTransmision') filtroTransmision: any;
  @ViewChild('filtroCombustible') filtroCombustible: any;

  filtros: any[];

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

  // * datos
  autos: any[];
  tiposTransmision: string[];
  tiposCombustible: string[];
  tiposCarroceria: string[];
  anos: number[];

  // * ngs slider
  minPrice: number = 1000;
  maxPrice: number = 50000;
  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    step: 1000,
    translate: (value: number, label: LabelType): string => {
      this.filteredCarros = this.filteredCarros.filter(
        (carro: AutoSemiNuevo) => {
          return (
            carro.precioVenta >= this.minPrice &&
            carro.precioVenta <= this.maxPrice
          );
        }
      );
      this.currPage = 0;
      this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
      this.pages = Array(this.pgCnt)
        .fill(this.pgCnt)
        .map((x: any, i: any) => i);
      return '';
    },
  };

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private dataService: DataService
  ) {
    this.autos = this.dataService.autos;
    this.tiposTransmision = this.dataService.tiposTransmision;
    this.tiposCombustible = this.dataService.tiposCombustible;
    this.tiposCarroceria = this.dataService.tiposCarroceria;
    this.anos = this.dataService.anos;
    this.filtros = [
      this.filtroMarca,
      this.filtroModelo,
      this.filtroCarroceria,
      this.filtroDesde,
      this.filtroHasta,
      this.filtroTransmision,
      this.filtroCombustible,
    ];
  }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);
    if (this.mode === ModesEnum.USER_SEARCH) {
      //TODO: usar el this.filters!.carSubset ('all', 'new', 'used')

      console.group('USER_SEARCH');

      console.groupEnd();

      this.userService.getAutosSemiNuevosValidados().subscribe(
        (response: AutoSemiNuevo[]) => {
          // this.carros = response;

          console.group('FILTERS');
          console.log(this.filters);
          console.groupEnd();

          console.group('buenos dias carajo');
          console.dir(this.carros);
          console.groupEnd();

          let normalizedCarBrand = this._normalizeValue(this.filters.carBrand);
          let normalizedCarModel = this._normalizeValue(this.filters.carModel);

          this.filteredCarros = response.filter((carro: AutoSemiNuevo) => {
            console.log(carro);
            return (
              this._normalizeValue(carro.marca) == normalizedCarBrand &&
              this._normalizeValue(carro.modelo) == normalizedCarModel &&
              carro.precioVenta <= this.filters.carMaxPrice
              // && carro.auto.tipocarroceria === this.filters!.carType
            );
          });

          // ! esta linea permite que cuando el usuario filtre, se haga el
          // ! filtro sobre los carros ya filtrados y no sobre toda la bd de
          // ! carros. lo dejamos así?
          this.carros = this.filteredCarros;

          console.group('Filtered Carros');
          console.dir(this.filteredCarros);
          console.groupEnd();

          this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
          this.pages = Array(this.pgCnt)
            .fill(this.pgCnt)
            .map((x: any, i: any) => i);

          this.loaderService.setIsLoading(false);
          // ? actualizar filtros
        },
        (error: any) => {
          this.loaderService.setIsLoading(false);
          console.error(
            'when fetching all semi nuevos validados in published-car.component.ts: ',
            error
          );
        }
      );
    } else {
      console.group('DASHBOARD');

      console.groupEnd();

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
            this.loaderService.setIsLoading(false);
          },
          (error: any) => {
            this.loaderService.setIsLoading(false);
            console.group('Error');
            console.error('In pubished-cars.component:');
            console.error(error);
            console.groupEnd();
          }
        );
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  filterByName(event: any): void {
    console.group('Event');
    console.log(event.target.value);
    console.groupEnd();
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredCarros = this.carros.filter((carro: AutoSemiNuevo) => {
      return (
        this._normalizeValue(carro.marca).includes(normalizedQuery) ||
        this._normalizeValue(carro.modelo).includes(normalizedQuery)
      );
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

  changeBrand(e: any): void {
    const brand = e.target.value;
    console.log('selected brand: ', brand);

    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.marca.includes(brand);
    });
  }

  changeModel(e: any): void {
    const model: string = e.target.value;
    console.log('selected model: ', model);
    //TODO: el error de mierdaaaaaaaaaaaaa
    // this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
    //   return carro.modelo.includes(model);
    // });
  }

  changeCarroceria(e: any): void {
    const carroceria: string = e.target.value;
    console.log('selected carroceria: ', carroceria);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCarroceria.includes(carroceria);
    });
  }

  changeTransmision(e: any): void {
    const transmision: string = e.target.value;
    console.log('selected transmision: ', transmision);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCambios.includes(transmision);
    });
  }

  changeCombustible(e: any): void {
    const combustible: string = e.target.value;
    console.log('selected combustible: ', combustible);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCombustible.includes(combustible);
    });
  }

  changeAnoFrom(e: any): void {
    const from: number = e.target.value;
    console.log('selected from year: ', from);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.anoFabricacion >= from;
    });
  }

  changeAnoTo(e: any): void {
    const to: number = e.target.value;
    console.log('selected to year: ', to);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.anoFabricacion <= to;
    });
  }

  sortBy(order: any): void {
    console.group(order.target.value);
    console.groupEnd();
    //TODO: sort por algun criterio
  }

  resetFilters(): void {
    //TODO: resetear cómo se ven los selects
    this.filteredCarros = this.carros;
    this.filtros.map((filtro: any) => {
      filtro.nativeElement.selected = false;
    });
  }
}
