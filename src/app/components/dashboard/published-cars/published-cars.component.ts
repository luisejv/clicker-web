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
import { Ubigeo } from 'src/app/core/interfaces/ubigeo';

declare var $: any;

interface Update {
  subset?: boolean;
  brands?: boolean;
  models?: boolean;
  type?: boolean; //carroceria
  from?: boolean;
  transmission?: boolean;
  combustible?: boolean;
  traction?: boolean;
  departments?: boolean;
}

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
  backupFilteredCarros: AutoSemiNuevo[] = [];
  originalFilteredCarros: AutoSemiNuevo[] = [];

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
  departamentos: string[] = [];
  tiposTracciones: string[];

  // * ngx slider
  minPrice!: number;
  maxPrice!: number;
  options!: Options;
  minKilometraje!: number;
  maxKilometraje!: number;
  optionsKilometraje!: Options;

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
    this.tiposTracciones = this.dataService.tiposTracciones;
    this.anos = this.dataService.anos;
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
      // carKilometraje: '',
      carDepartamentos: '',
      carTraction: '',
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);

    this.clientService.getUbigeos().subscribe(
      (response: Ubigeo[]) => {
        console.group('Ubigeo');
        console.log(response);
        console.groupEnd();
        //TODO: endpoint que devuelva todos los departamentos porq acá se hace chamba de más
        response.forEach((ubigeo: Ubigeo) => {
          if (this.departamentos.indexOf(ubigeo.departamento) === -1) {
            this.departamentos.push(ubigeo.departamento);
          }
        });
        console.warn('departamentos: ', this.departamentos);
      },
      (error: any) => {
        console.error('fetching ubigeos');
      }
    );

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

    //TODO: agarrar minKilometraje y maxKilometraje del backend
    this.minKilometraje = 0;
    this.maxKilometraje = 500000; // 500 000 km

    this.updatePriceSliderOptions();
    this.updateKilometrajeSliderOptions();

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
        // carMileage: '',
        carDepartamentos: '',
        carTraction: '',
      });

      this.updateSelects(ModesEnum.USER_SEARCH);

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
              this.backupFilteredCarros = this.filteredCarros;
              this.originalFilteredCarros = this.filteredCarros;

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
              this.backupFilteredCarros = this.filteredCarros;
              this.originalFilteredCarros = this.filteredCarros;

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
            this.auxFilteredCarros = this.filteredCarros;
            this.backupFilteredCarros = this.filteredCarros;

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
    //TODO: podría seter backup, filteres, aux y original acá mejor
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
    window.scrollTo(0, 0);
  }

  changeCarSubset(e: any): void {
    const subset: string = e.target.value;
    //TODO: función que reciba el 'subset' y retorne los carros correspondientes, hacer el request acá
    //TODO: send request of subset ('NEW', 'USED')
    this.userService.getAutosSemiNuevosValidados().subscribe(
      (response: AutoSemiNuevo[]) => {
        this.carros = response;
        this.filteredCarros = this.carros;
        this.auxFilteredCarros = this.filteredCarros;
        this.backupFilteredCarros = this.filteredCarros;
        this.originalFilteredCarros = this.filteredCarros;

        console.group('Autos Semi Nuevos');
        console.dir(this.carros);
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
    this.filterFormGroup.controls['carSubset'].setValue(subset);
    this.updatePagination();
  }

  changeBrand(e: any | string): void {
    if (this.carType?.value === '') {
      this.filteredCarros = this.carros;
    }
    const updateFlags: Update = {
      models: true,
      type: this.carType?.value !== '' ? false : true,
      from: true,
      transmission: true,
      combustible: true,
      traction: true,
      departments: true,
    };
    this.updateSelects(undefined, updateFlags);
    let brand: string;
    if (typeof e === 'string') {
      brand = e;
    } else {
      brand = e.target.value;
    }
    if (this.carType?.value === '') {
      this.filteredCarros = this.filteredCarros.filter(
        (carro: AutoSemiNuevo) => {
          return carro.marca.includes(brand);
        }
      );
      this.backupFilteredCarros = this.filteredCarros;
    } else {
      this.backupFilteredCarros = this.carros.filter((carro: AutoSemiNuevo) => {
        return carro.marca.includes(brand);
      });
      this.filteredCarros = this.backupFilteredCarros.filter(
        (carro: AutoSemiNuevo) => {
          return carro.tipoCarroceria.includes(this.carType?.value);
        }
      );
    }
    this.auxFilteredCarros = this.filteredCarros;
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
      this.carModel?.setValue('');
    }, 1000);
    this.updatePagination();
  }

  changeModel(e: any): void {
    const model: string = e.target.value;
    this.filteredCarros = this.backupFilteredCarros;
    let resetType = true;
    if (this.carType?.value !== '') {
      this.carFilters.forEach((filter: Filter) => {
        if (
          filter.tipoCarroceria === this.carType?.value &&
          filter.modelo === model
        ) {
          resetType = false;
        }
      });
    }
    const updateFlags: Update = {
      type: resetType,
      from: true,
      transmission: true,
      combustible: true,
      traction: true,
      departments: true,
    };
    this.updateSelects(undefined, updateFlags);

    console.log('selected model: ', model);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.modelo.includes(model);
    });
    this.auxFilteredCarros = this.filteredCarros;
    this.updatePagination();
  }

  changeCarroceria(e: any): void {
    const type: string = e.target.value;
    this.filterFormGroup.controls['carType'].setValue(type.toUpperCase());
    console.log(this.filterFormGroup.get('carType')?.value);
    if (type.toLowerCase() != 'otro') {
      // ! aca se estan camiando los brands
      // entonces si seleccione un modelo de un brand q ya no esta acá, debo deshacer esa seleccion
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

    // * si la marca q he seleccionado no tiene esta carroceria, resetear Marca y Modelo
    if (
      this.carBrand?.value !== '' &&
      this.filteredBrands.indexOf(this.carBrand?.value) === -1
    ) {
      if (this.filteredCarros.length !== 0) {
        console.warn('deberia estar aca');
        this.filteredCarros = this.carros;
        this.filteredModels = [];
        this.filterFormGroup.get('carBrand')?.setValue('');
        this.filterFormGroup.get('carModel')?.setValue('');
        setTimeout(() => {
          $('#marcas').selectpicker('refresh');
          $('#modelos').selectpicker('refresh');
        }, 250);
        if (type !== 'OTRO') {
          this.filteredCarros = this.carros.filter((carro: AutoSemiNuevo) => {
            return carro.tipoCarroceria.includes(type);
          });
          this.auxFilteredCarros = this.filteredCarros;
          this.updatePagination();
        }
        //TODO: falta el 'else'
      }
    } else {
      // * si la marca q he seleccionado si tiene esa carroceria, solo resetear Modelo
      this.filteredModels = this.carFilters
        .filter((elem: Filter) => {
          return (
            elem.marca === this.carBrand?.value && elem.tipoCarroceria === type
          );
        })
        .map((elem) => elem.modelo)
        .filter((v, i, a) => a.indexOf(v) == i);
      setTimeout(() => {
        let aux = this.carBrand?.value;
        let tmp = this.carModel?.value;
        $('#marcas').selectpicker('refresh');
        $('#modelos').selectpicker('refresh');
        this.carBrand?.setValue(aux);
        this.carModel?.setValue(tmp);
      }, 250);
      if (type !== 'OTRO') {
        this.filteredCarros = this.backupFilteredCarros.filter(
          (carro: AutoSemiNuevo) => {
            return carro.tipoCarroceria.includes(type);
          }
        );
        this.auxFilteredCarros = this.filteredCarros;
        this.updatePagination();
      }
      //TODO: falta el 'else'
    }

    console.log(this.filteredBrands);

    const updateFlags: Update = {
      from: true,
      transmission: true,
      combustible: true,
      traction: true,
      departments: true,
    };
    this.updateSelects(undefined, updateFlags);
  }

  changeTransmision(e: any): void {
    const transmision: string = e.target.value;
    console.log('selected transmision: ', transmision);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCambios.includes(transmision);
    });
    this.auxFilteredCarros = this.filteredCarros;
    this.updatePagination();
  }

  changeCombustible(e: any): void {
    const combustible: string = e.target.value;
    console.log('selected combustible: ', combustible);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoCombustible.includes(combustible);
    });
    this.auxFilteredCarros = this.filteredCarros;
    this.updatePagination();
  }

  changeTraccion(e: any): void {
    const traccion: string = e.target.value;
    console.log('selected traccion: ', traccion);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.tipoTraccion.includes(traccion);
    });
    this.auxFilteredCarros = this.filteredCarros;
    this.updatePagination();
  }

  changeDepartamentos(e: any): void {
    const departamento: string = e.target.value;
    console.log('selected departamento: ', departamento);
    console.log('selected departamentos form: ', this.carDepartamentos?.value);

    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      let johnathanPrieto: boolean = false;
      this.carDepartamentos?.value.forEach((departamento: string) => {
        johnathanPrieto =
          johnathanPrieto ||
          carro.locaciones!.departamento!.includes(departamento);
      });
      return johnathanPrieto;
    });
    this.auxFilteredCarros = this.filteredCarros;

    this.updatePagination();
  }

  changeAnoFrom(e: any): void {
    const from: number = e.target.value;
    console.log('selected from year: ', from);
    this.filteredCarros = this.filteredCarros.filter((carro: AutoSemiNuevo) => {
      return carro.anoFabricacion >= from;
    });
    this.auxFilteredCarros = this.filteredCarros;
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

    if (this.mode === ModesEnum.USER_SEARCH) {
      this.filteredCarros = this.originalFilteredCarros;
    } else {
      this.filteredCarros = this.carros;
    }

    this.auxFilteredCarros = this.filteredCarros;
    this.backupFilteredCarros = this.filteredCarros;

    //TODO: get min and max car price from request
    this.minPrice = 0;
    this.maxPrice = 50000;

    this.minKilometraje = 0;
    this.maxKilometraje = 500000;

    this.updatePriceSliderOptions();
    this.updateKilometrajeSliderOptions();

    this.filteredModels = [];

    const updateFlags: Update = {
      subset: true,
      brands: brand,
      models: true,
      type: true,
      from: true,
      transmission: true,
      combustible: true,
      traction: true,
      departments: true,
    };

    this.updateSelects(undefined, updateFlags);
  }

  //TODO: NO RECARGA SIEMPRE LOS DEPARTMANETOs (creo q ya esta arreglado, probar varias veces)

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

  get carDepartamentos() {
    return this.filterFormGroup.get('carDepartamentos');
  }

  get carTraction() {
    return this.filterFormGroup.get('carTraction');
  }

  updatePagination(): void {
    this.currPage = 0;
    this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
    this.pages = Array(this.pgCnt)
      .fill(this.pgCnt)
      .map((x: any, i: any) => i);
  }

  updatePriceSliderOptions(): void {
    this.options = {
      floor: this.minPrice,
      ceil: this.maxPrice,
      step: 1000,
      translate: (value: number, label: LabelType): string => {
        this.filteredCarros = this.auxFilteredCarros.filter(
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
  }

  updateKilometrajeSliderOptions(): void {
    this.optionsKilometraje = {
      floor: this.minKilometraje,
      ceil: this.maxKilometraje,
      step: 5000, // TODO: depende de qué kilometrajes dejemos que el usuario ingrese
      translate: (value: number, label: LabelType): string => {
        this.filteredCarros = this.auxFilteredCarros.filter(
          (carro: AutoSemiNuevo) => {
            return (
              carro.kilometraje >= this.minKilometraje &&
              carro.kilometraje <= this.maxKilometraje
            );
          }
        );
        this.updatePagination();
        return '';
      },
    };
  }

  updateSelects(mode?: ModesEnum, update?: Update): void {
    console.group('updateSelects');
    console.dir(update);
    console.groupEnd();
    // interface Update {
    //   subset?: boolean,
    //   brands?: boolean,
    //   models?: boolean,
    //   type?: boolean, //carroceria
    //   from?: boolean,
    //   transmission?: boolean,
    //   combustible?: boolean,
    //   traction?: boolean,
    //   departments?: boolean,
    // }

    if (update?.departments) {
      setTimeout(() => {
        $('#departamentos').selectpicker('refresh');
      }, 1000);
    }

    if (update?.brands) {
      setTimeout(() => {
        $('#marcas').selectpicker('refresh');
      }, 500);
    }

    setTimeout(() => {
      if (update?.subset) {
        $('#subsets').selectpicker('refresh');
      }
      if (update?.models) {
        $('#modelos').selectpicker('refresh');
      }
      if (mode && mode === ModesEnum.USER_SEARCH) {
        if (this.marca !== '') {
          this.changeBrand(this.marca);
        }
      }
      if (update?.type) {
        this.carType?.setValue('');
        $('#carrocerias').selectpicker('refresh');
      }
      if (update?.type) {
        console.log('carajo');
        this.carMinYear?.setValue('');
        $('#desde').selectpicker('refresh');
      }
      if (update?.transmission) {
        this.carTransmission?.setValue('');
        $('#transmisiones').selectpicker('refresh');
      }
      if (update?.combustible) {
        this.carFuelType?.setValue('');
        $('#combustibles').selectpicker('refresh');
      }
      if (update?.traction) {
        this.carTraction?.setValue('');
        $('#tracciones').selectpicker('refresh');
      }
    }, 500);
  }
}
