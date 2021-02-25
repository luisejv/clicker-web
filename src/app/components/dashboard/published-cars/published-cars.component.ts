import { LabelType, Options } from '@angular-slider/ngx-slider';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { ModesEnum } from 'src/app/core/enums/modes.enum';
import { User } from 'src/app/core/interfaces/user';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { DataService } from 'src/app/core/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/core/services/client.service';
import { Filter } from 'src/app/core/interfaces/client';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-published-cars',
  templateUrl: './published-cars.component.html',
  styleUrls: ['./published-cars.component.css'],
})
export class PublishedCarsComponent implements OnInit {
  @Input() mode: ModesEnum = ModesEnum.USER_SEARCH;
  @Input() filters!: CarSearchFilter;
  @Input() name: string = 'Carros Publicados';
  @Input() cameFrom: string = 'Dashboard';

  // * filters
  carrocerias!: string[];
  filterFormGroup: FormGroup;
  filteredBrands!: string[];
  filteredModels!: string[];
  carFilters!: Filter[];

  // * user
  correo: string = '';

  // * cars
  carros: AutoSemiNuevo[] = [];
  filteredCarros: AutoSemiNuevo[] = [];
  auxFilteredCarros: AutoSemiNuevo[] = [];

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
  anos!: string[];

  // * ngs slider
  minPrice!: number;
  maxPrice!: number;
  options!: Options;

  // * Grid - Listings
  /* @ViewChild('list') list!: ElementRef;
  @ViewChild('grid') grid!: ElementRef; */
  list: boolean = true;

  //TODO: kilometraje
  //TODO: departamentos
  //TODO: traccion
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    // TODO: recargar la página cuando hace click en 'AUTOS USADOS'
    this.autos = this.dataService.autos;
    this.tiposTransmision = this.dataService.tiposTransmision;
    this.tiposCombustible = this.dataService.tiposCombustible;
    this.tiposCarroceria = this.dataService.tiposCarroceria;
    this.filterFormGroup = this.fb.group({
      carBrand: '',
      carModel: '',
      carType: '',
      carSubset: '',
      carMinYear: '',
      carTransmission: '',
      carFuelType: '',
      //TODO: los de abajo
      carMileage: '',
      carDepartments: '',
      carTraction: '',
    });
    /* this.route.params.subscribe((val) => this.ngOnInit()); */
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);

    this.clientService.getFilters().subscribe(
      (response: Filter[]) => {
        console.log('Filtros: ', response);
        this.carFilters = response;
        this.filteredBrands = this.carFilters
          .map((elem: Filter) => elem.marca)
          .filter((v, i, a) => a.indexOf(v) == i);
        this.carrocerias = response
          .map((elem: Filter) => elem.tipoCarroceria)
          .filter((v, i, a) => a.indexOf(v) == i);
        this.carrocerias.push('OTRO');
        console.log('Marcas: ', this.filteredBrands);
        console.log('Carrocerias: ', this.carrocerias);

        this.filteredModels = this.carFilters
          .filter((elem: Filter) =>
            this.carType?.value != 'OTRO'
              ? elem.marca == this.carBrand?.value &&
                elem.tipoCarroceria == this.carType?.value &&
                (this.carSubset?.value == 'ALL' ||
                  elem.tipoCarro == this.carSubset?.value)
              : elem.marca == this.carBrand?.value &&
                (this.carSubset?.value == 'ALL' ||
                  elem.tipoCarro == this.carSubset?.value)
          )
          .map((elem) => elem.modelo)
          .filter((v, i, a) => a.indexOf(v) == i);
        console.log('filtered models');
        console.log(this.filteredModels);

        setTimeout(() => {
          $('#marcas').selectpicker('refresh');
          $('#modelos').selectpicker('refresh');
        }, 500);
      },
      (error) => {
        console.group('In getting filters');
        console.error(error);
        console.groupEnd();
      }
    );

    console.group('Filters');
    console.log(this.filters);
    console.groupEnd();

    if (this.filters?.carMaxPrice) {
      this.minPrice = 0;
      this.maxPrice = this.filters.carMaxPrice!;
    } else {
      //TODO: agarrar min y max precio del backend
      this.minPrice = 0;
      this.maxPrice = 50000;
    }

    //TODO: revisar que los filtros estén bien

    this.options = {
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
        this.updatePagination();
        return '';
      },
    };

    this.anos = this.dataService.anos;

    console.log('cameFrom: ', this.cameFrom);

    if (this.mode === ModesEnum.USER_SEARCH) {
      this.filterFormGroup = this.fb.group({
        carBrand: this.marca,
        carModel: this.modelo,
        carType: this.carroceria,
        carSubset: this.subset,
        carMinYear: this.desde,
        carTransmission: '',
        carFuelType: '',
        //TODO: los de abajo
        carMileage: '',
        carDepartments: '',
        carTraction: '',
      });

      setTimeout(() => {
        $('#subsets').selectpicker('refresh');
      }, 500);

      setTimeout(() => {
        $('#marcas').selectpicker('refresh');
      }, 500);

      setTimeout(() => {
        $('#modelos').selectpicker('refresh');
        if (this.marca !== '') {
          this.changeBrand(this.marca);
        }
      }, 500);

      setTimeout(() => {
        $('#carrocerias').selectpicker('refresh');
      }, 500);

      setTimeout(() => {
        $('#desde').selectpicker('refresh');
      }, 500);

      setTimeout(() => {
        $('#transmisiones').selectpicker('refresh');
      }, 500);

      setTimeout(() => {
        $('#combustibles').selectpicker('refresh');
      }, 500);

      // setTimeout(() => {
      //   $('#tracciones').selectpicker('refresh');
      // }, 500);

      // setTimeout(() => {
      //   $('#departamentos').selectpicker('refresh');
      // }, 500);

      console.group('USER_SEARCH');
      switch (this.filters?.carSubset) {
        case 'ALL': {
          //TODO: GET all cars, then filter
          console.log('ALL');
          console.warn(
            'Por ahora se estan obteniendo los Semi Nuevos pero cuano estén, se tendrá que hacer fetch a todos los carros disponibles, no solo Semi Nuevos'
          );
          this.userService.getAutosSemiNuevosValidados().subscribe(
            (response: AutoSemiNuevo[]) => {
              this.carros = response;

              console.group('Autos Semi Nuevos');
              console.dir(this.carros);
              console.groupEnd();

              this.filteredCarros = this.filterResponse(response);

              this.auxFilteredCarros = this.filteredCarros;

              this.updatePagination();

              this.loaderService.setIsLoading(false);
            },
            (error: any) => {
              this.loaderService.setIsLoading(false);
              console.error(
                'when fetching all semi nuevos validados in published-car.component.ts: ',
                error
              );
            }
          );
          break;
        }
        case 'NEW': {
          //TODO: GET new cars, then filter
          console.log('NEW');
          break;
        }
        case 'USED': {
          console.log('USED');
          this.userService.getAutosSemiNuevosValidados().subscribe(
            (response: AutoSemiNuevo[]) => {
              this.carros = response;

              console.group('FILTERS');
              console.log(this.filters);
              console.groupEnd();

              console.group('Autos Semi Nuevos');
              console.dir(this.carros);
              console.groupEnd();

              console.group('Filtrando Carros');

              this.filteredCarros = this.filterResponse(response);

              this.auxFilteredCarros = this.filteredCarros;

              console.groupEnd();

              console.group('Filtered Carros');
              console.dir(this.filteredCarros);
              console.groupEnd();

              this.updatePagination();

              this.loaderService.setIsLoading(false);
            },
            (error: any) => {
              this.loaderService.setIsLoading(false);
              console.error(
                'when fetching all semi nuevos validados in published-car.component.ts: ',
                error
              );
            }
          );
          break;
        }
        default: {
          console.warn('unknown carSubset');
          this.userService.getAutosSemiNuevosValidados().subscribe(
            (response: AutoSemiNuevo[]) => {
              this.carros = response;

              console.group('Autos Semi Nuevos');
              console.dir(this.carros);
              console.groupEnd();

              this.filteredCarros = response;

              this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
              this.pages = Array(this.pgCnt)
                .fill(this.pgCnt)
                .map((x: any, i: any) => i);

              this.loaderService.setIsLoading(false);
            },
            (error: any) => {
              this.loaderService.setIsLoading(false);
              console.error(
                'when fetching all semi nuevos validados in published-car.component.ts: ',
                error
              );
            }
          );
        }
      }
      console.groupEnd();
    } else {
      console.group('DASHBOARD');
      // ! cuidado con esto, si es undefined entonces deslogger al user
      this.correo = this.storageService.getEmailSessionStorage()!; // 😬
      this.userService
        .getAutosSemiNuevosValidadosUserUrl(this.correo)
        .subscribe(
          (res: User) => {
            // ! cuidado con el '!'
            const response: AutoSemiNuevo[] = res.carrosPosteados!;

            this.carros = response;
            this.filteredCarros = response;

            this.updatePagination();

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
      console.groupEnd();
    }
  }

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  filterResponse(response: AutoSemiNuevo[]): AutoSemiNuevo[] {
    let filtered = response.filter((carro: AutoSemiNuevo) => {
      console.log(carro);
      console.log(this.tiposCarroceria.indexOf(carro.tipoCarroceria) === -1);
      console.log('carroceria: ', carro.tipoCarroceria);
      return (
        (this.filters.carBrand
          ? carro.marca === this.filters.carBrand
          : true) &&
        (this.filters.carModel
          ? carro.modelo === this.filters.carModel
          : true) &&
        (this.filters.carMaxPrice
          ? carro.precioVenta <= Number(this.filters.carMaxPrice)
          : true) &&
        (this.filters.carType
          ? this.filters.carType === 'OTRO'
            ? this.tiposCarroceria.indexOf(carro.tipoCarroceria) === -1
            : this.filters.carType === carro.tipoCarroceria
          : true) &&
        (this.filters.carMinYear
          ? carro.anoFabricacion >= this.filters.carMinYear
          : true)
      );
    });
    return filtered;
  }

  filterByName(event: any): void {
    console.group('Event');
    console.log(event.target.value);
    console.groupEnd();
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredCarros = this.auxFilteredCarros.filter(
      (carro: AutoSemiNuevo) => {
        //TODO: añadir más propiedades? (año, kilometraje, etc)
        return (
          this._normalizeValue(carro.marca).includes(normalizedQuery) ||
          this._normalizeValue(carro.modelo).includes(normalizedQuery)
        );
      }
    );
    this.updatePagination();
  }

  goToPage(pageId: number): void {
    this.currPage = pageId;
    /* $('body').animate({ scrollTop: 0 }, 1000); */
    window.scrollTo(0, 0);
  }

  changeCarSubset(e: any): void {
    console.log(
      'Car Subset: ',
      this.filterFormGroup.controls['carSubset'].value
    );
    this.filteredBrands = this.carFilters
      .filter(
        (elem: Filter) =>
          this.carSubset?.value == 'ALL' ||
          elem.tipoCarro == this.carSubset?.value
      )
      .map((elem) => elem.marca)
      .filter((v, i, a) => a.indexOf(v) == i);
    console.group('Filtered Brands');
    console.log(this.filteredBrands);
    console.groupEnd();
    this.filteredModels = [];
    this.resetFilters(true);
    const subset: string = e.target.value;
    this.filterFormGroup.controls['carSubset'].setValue(subset);
    this.updatePagination();
  }

  changeBrand(e: any | string): void {
    let brand: string;
    if (typeof e === 'string') {
      brand = e;
    } else {
      brand = e.target.value;
    }
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.marca.includes(brand);
    });
    console.group('Filtered carros after brand change');
    console.log(this.filteredCarros);
    console.groupEnd();
    console.log('Change Car Brand Event: ', brand);
    console.log(this.filterFormGroup.get('carBrand')?.value);
    console.warn('carType: ', this.carType?.value);
    this.filteredModels = this.carFilters
      .filter((elem: Filter) => {
        if (this.carType?.value !== '') {
          if (this.carSubset?.value !== '') {
            return this.carType?.value != 'OTRO'
              ? elem.marca == brand &&
                  elem.tipoCarroceria == this.carType?.value &&
                  (this.carSubset?.value == 'ALL' ||
                    elem.tipoCarro == this.carSubset?.value)
              : elem.marca == brand &&
                  (this.carSubset?.value == 'ALL' ||
                    elem.tipoCarro == this.carSubset?.value);
          } else {
            return this.carType?.value != 'OTRO'
              ? elem.marca == brand &&
                  elem.tipoCarroceria == this.carType?.value
              : elem.marca == brand;
          }
        } else {
          if (this.carSubset?.value !== '') {
            return (
              elem.marca == brand &&
              (this.carSubset?.value == 'ALL' ||
                elem.tipoCarro == this.carSubset?.value)
            );
          } else {
            return elem.marca == brand;
          }
        }
      })
      .map((elem) => elem.modelo)
      .filter((v, i, a) => a.indexOf(v) == i);
    console.log('filtered models');
    console.log(this.filteredModels);
    setTimeout(() => {
      $('#modelos').selectpicker('refresh');
    }, 500);
    this.updatePagination();
  }

  changeModel(e: any): void {
    const model: string = e.target.value;
    console.log('selected model: ', model);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.modelo.includes(model);
    });
    this.updatePagination();
  }

  changeCarroceria(e: any): void {
    const type: string = e.target.value;
    this.filterFormGroup.controls['carType'].setValue(type.toUpperCase());
    console.log(this.filterFormGroup.get('carType')?.value);
    if (type.toLowerCase() != 'otro') {
      this.filteredBrands = this.carFilters
        .filter((elem: Filter) => {
          return elem.tipoCarroceria.toLowerCase() == type.toLowerCase();
        })
        .map((elem) => elem.marca)
        .filter((v, i, a) => a.indexOf(v) == i);
    } else {
      this.filteredBrands = this.carFilters
        .map((elem: Filter) => elem.marca)
        .filter((v, i, a) => a.indexOf(v) == i);
    }
    //TODO: lo de abajo deberia ser condicional a si no hay match entre la carroceria y la current brand
    this.filteredModels = [];
    this.filterFormGroup.get('carBrand')?.setValue('');
    this.filterFormGroup.get('carModel')?.setValue('');
    setTimeout(() => {
      $('#marcas').selectpicker('refresh');
      $('#modelos').selectpicker('refresh');
    }, 250);
    console.log(this.filteredBrands);

    const carroceria: string = e.target.value;
    console.log('selected carroceria: ', carroceria);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCarroceria.includes(carroceria);
    });
    this.updatePagination();
  }

  changeTransmision(e: any): void {
    const transmision: string = e.target.value;
    console.log('selected transmision: ', transmision);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCambios.includes(transmision);
    });
    this.updatePagination();
  }

  changeCombustible(e: any): void {
    const combustible: string = e.target.value;
    console.log('selected combustible: ', combustible);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCombustible.includes(combustible);
    });
    this.updatePagination();
  }

  changeAnoFrom(e: any): void {
    const from: number = e.target.value;
    console.log('selected from year: ', from);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.anoFabricacion >= from;
    });
    this.updatePagination();
  }

  sortBy(order: any): void {
    console.group(order.target.value);
    console.groupEnd();
    //TODO:
    this.updatePagination();
  }

  resetFilters(brand: boolean = false): void {
    this.carBrand?.setValue('');
    this.carModel?.setValue('');
    this.carMaxPrice?.setValue('');
    this.carMinYear?.setValue('');
    this.carTransmission?.setValue('');
    this.carFuelType?.setValue('');
    if (!brand) {
      this.carSubset?.setValue('');
    }
    this.carType?.setValue('');

    this.filteredCarros = this.carros;

    //TODO: get min and max car price from request
    this.minPrice = 0;
    this.maxPrice = 50000;

    this.options = {
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
        this.updatePagination();
        return '';
      },
    };

    this.filteredModels = [];

    setTimeout(() => {
      $('#subsets').selectpicker('refresh');
    }, 500);

    setTimeout(() => {
      $('#marcas').selectpicker('refresh');
    }, 500);

    setTimeout(() => {
      $('#modelos').selectpicker('refresh');
    }, 500);

    setTimeout(() => {
      $('#carrocerias').selectpicker('refresh');
    }, 500);

    setTimeout(() => {
      $('#desde').selectpicker('refresh');
    }, 500);

    setTimeout(() => {
      $('#transmisiones').selectpicker('refresh');
    }, 500);

    setTimeout(() => {
      $('#combustibles').selectpicker('refresh');
    }, 500);
  }

  // * filtros que vienen de Home

  get subset(): string {
    return typeof this.filters?.carSubset !== 'undefined'
      ? this.filters.carSubset
      : '';
  }

  get marca(): string {
    return typeof this.filters?.carBrand !== 'undefined'
      ? this.filters.carBrand
      : '';
  }

  get modelo(): string {
    return typeof this.filters?.carModel !== 'undefined'
      ? this.filters.carModel
      : '';
  }

  get carroceria(): string {
    return typeof this.filters?.carType !== 'undefined'
      ? this.filters.carType
      : '';
  }

  get desde(): string {
    return typeof this.filters?.carMinYear !== 'undefined'
      ? this.filters.carMinYear.toString()
      : '';
  }

  get maxPrecio(): string {
    return typeof this.filters?.carMaxPrice !== 'undefined'
      ? this.filters.carMaxPrice.toString()
      : '';
  }

  // * filtros que el usuario va a aplicar

  get carBrand() {
    return this.filterFormGroup.get('carBrand');
  }

  get carModel() {
    return this.filterFormGroup.get('carModel');
  }

  get carMaxPrice() {
    return this.filterFormGroup.get('carMaxPrice');
  }

  get carMinYear() {
    return this.filterFormGroup.get('carMinYear');
  }

  get carTransmission() {
    return this.filterFormGroup.get('carTransmission');
  }

  get carFuelType() {
    return this.filterFormGroup.get('carFuelType');
  }

  get carType() {
    return this.filterFormGroup.get('carType');
  }

  get carSubset() {
    return this.filterFormGroup.get('carSubset');
  }

  updatePagination(): void {
    this.currPage = 0;
    this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
    this.pages = Array(this.pgCnt)
      .fill(this.pgCnt)
      .map((x: any, i: any) => i);
  }
}
