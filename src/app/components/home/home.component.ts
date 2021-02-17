import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { DataService } from 'src/app/core/services/data.service';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/core/interfaces/client';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  carType: string = 'SUV';
  carSubset: string = 'ALL';

  recentCars!: AutoSemiNuevo[];
  sponsoredCars!: AutoSemiNuevo[];
  // sponsoredCars: Observable<any>;

  // availableVehicles: Observable<any>;
  // brandCount: Observable<any>;
  // userCount: Observable<any>;
  // soldVehicles: Observable<any>;

  availableVehicles!: number;
  brandCount!: number;
  userCount!: number;
  soldVehicles!: number;

  filters!: Filter[];
  filteredBrands: string[] = [''];
  filteredModels: string[] = ['Debe seleccionar una marca'];
  filteredPrices: number[] = [5000, 15000, 25000];

  filterFormGroup: FormGroup;

  carBrand: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private clientService: ClientService,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.filterFormGroup = this.fb.group({
      carType: '',
      carSubset: '',
      carBrand: '',
      carModel: '',
      carMaxPrice: '',
    });

    // this.availableVehicles = this.clientService.getAvailableVehiclesCount();
    // this.brandCount = this.clientService.getBrandCount();
    // this.userCount = this.clientService.getUserCount();
    // this.soldVehicles = this.clientService.getSoldVehiclesCount();
    // this.sponsoredCars = this.clientService.getSponsoredCars();
  }

  ngOnInit(): void {
    this.clientService.getFilters().subscribe(
      (response: Filter[]) => {
        this.filters = response;
        this.filteredBrands = this.filters
          .map((elem) => elem.marca)
          .filter((v, i, a) => a.indexOf(v) == i);
      },
      (error) => {
        console.group('In getting filters');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getBrandCount().subscribe(
      (count: number) => {
        this.brandCount = count;
      },
      (error: any) => {
        console.group('In getting brand count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getUserCount().subscribe(
      (count: number) => {
        this.userCount = count;
      },
      (error: any) => {
        console.group('In getting user count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getSoldVehiclesCount().subscribe(
      (count: number) => {
        this.soldVehicles = count;
      },
      (error: any) => {
        console.group('In getting sold vehicles count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getAvailableVehiclesCount().subscribe(
      (count: number) => {
        this.availableVehicles = count;
      },
      (error: any) => {
        console.group('In getting available count');
        console.error(error);
        console.groupEnd();
      }
    );
    this.clientService.getRecentCars().subscribe(
      (response: AutoSemiNuevo[]) => {
        this.recentCars = response;
      },
      (error: any) => {
        console.log('Error fetching recentCars: ', error);
      }
    );
    this.clientService.getSponsoredCars().subscribe(
      (response: SponsoredCar[]) => {
        console.log('Response Sponsored: ', response);
        this.sponsoredCars = response
          //.sort((a, b) => a.level - b.level)
          .map((elem: SponsoredCar) => elem.autoSemiNuevo);
        console.log(this.sponsoredCars);
      },
      (error: any) => {
        console.log('Error fetching sponsoredCars: ', error);
      }
    );
  }

  // Cambiar Carroceria
  changeCarType(type: string): void {
    this.filterFormGroup.controls['carType'].setValue(type.toUpperCase());
    console.log(this.filterFormGroup.get('carType')?.value);
    if (type.toLowerCase() != 'otro') {
      this.filteredBrands = this.filters
        .filter((elem: Filter) => {
          return elem.tipoCarroceria.toLowerCase() == type.toLowerCase();
        })
        .map((elem) => elem.marca)
        .filter((v, i, a) => a.indexOf(v) == i);
      if (this.filteredBrands.length == 0) {
        this.filteredBrands.push('No tenemos autos de ese tipo');
      }
    } else {
      this.filteredBrands = this.filters
        .map((elem) => elem.marca)
        .filter((v, i, a) => a.indexOf(v) == i);
    }
    setTimeout(() => {
      $('#marcas').selectpicker('refresh');
    }, 500);
    console.log(this.filteredBrands);
  }

  // Cambiar Usados, Nuevos, Todos
  changeCarSubset(subset: string): void {
    this.filterFormGroup.controls['carSubset'].setValue(subset);
    console.log(
      'Car Subset: ',
      this.filterFormGroup.controls['carSubset'].value
    );
  }

  // Cambiar marca
  changeCarBrand(e: any): void {
    const brand: string = e.target.value;
    console.log('Change Car Brand Event: ', e.target.value);
    console.log(this.filterFormGroup.get('carBrand')?.value);
    this.filteredModels = this.filters
      .filter((elem) => elem.marca == brand)
      .map((elem) => elem.modelo);
    setTimeout(() => {
      $('#modelos').selectpicker('refresh');
    }, 500);
  }

  searchCar(): void {
    const body: CarSearchFilter = {
      carType: this.filterFormGroup.value.carType,
      carSubset: this.filterFormGroup.value.carSubset,
      carBrand: this.filterFormGroup.value.carBrand,
      carModel: this.filterFormGroup.value.carModel,
      carMaxPrice: this.filterFormGroup.value.MaxPrice,
      allCars: false,
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  toListings(): void {
    const body: CarSearchFilter = {
      carType: '',
      carSubset: 'USED',
      carBrand: '',
      carModel: '',
      carMaxPrice: 0,
      allCars: true,
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  goToCarSearch(): void {
    const body: CarSearchFilter = {
      carType: '',
      carSubset: 'ALL',
      carBrand: '',
      carModel: '',
      carMaxPrice: 0,
      allCars: true, //! if false, does not apply filters
    };
    this.router.navigate(['/inventory-listings'], {
      queryParams: body,
    });
  }

  goToCarRegistration(): void {
    if (this.storageService.isLoggedIn()) {
      //TODO: redirect to car-registration
      console.log('redirect to car-registration');
      this.router.navigateByUrl('/dashboard/registrar-carro');
    } else {
      //TODO: register to login/register, then to car-registration
      console.log('register to login/register, then to car-registration');
      this.storageService.setGoingToCarRegistration('yes');
      this.router.navigateByUrl('/registro');
    }
  }

  goToVehicleDetails(carId: number | undefined): void {
    this.router.navigate(['/auto-semi-nuevo'], {
      queryParams: {
        id: carId,
      },
    });
  }
}
