import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AutoSemiNuevo,
  SponsoredCar,
} from 'src/app/core/interfaces/auto-semi-nuevo';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { DataService } from 'src/app/core/services/data.service';
import { ClientService } from 'src/app/core/services/client.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Filter } from 'src/app/core/interfaces/client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('availableVehicles') availableVehicles!: ElementRef;
  @ViewChild('brandCount') brandCount!: ElementRef;
  @ViewChild('userCount') userCount!: ElementRef;
  @ViewChild('soldVehicles') soldVehicles!: ElementRef;

  carType: string = 'SUV';
  carSubset: string = 'ALL';

  recentCars!: AutoSemiNuevo[];
  sponsoredCars!: AutoSemiNuevo[];

  filters!: Filter[];
  filteredBrands: string[] = [''];
  filteredModels: string[] = ['Debe seleccionar una marca'];
  filteredPrices: number[] = [5000, 15000, 25000];

  filterFormGroup: FormGroup;

  carBrand: string = '';

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  slideConfig2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  slideConfig3 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
  };

  constructor(
    private router: Router,
    private storageService: StorageService,
    private clientService: ClientService,
    private dataService: DataService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {
    this.filterFormGroup = this.fb.group({
      carType: '',
      carSubset: '',
      carBrand: '',
      carModel: '',
      carMaxPrice: '',
    });

    this.clientService.getAvailableVehiclesCount().subscribe(
      (res: number) => {
        this.availableVehicles.nativeElement.setAttribute('data-percent', res);
      },
      (error: any) => {
        console.error('error when fetching available cars');
      }
    );
    this.clientService.getBrandCount().subscribe(
      (res: number) => {
        this.brandCount.nativeElement.setAttribute('data-percent', res);
      },
      (error: any) => {
        console.error('error when fetching brand count');
      }
    );
    this.clientService.getUserCount().subscribe(
      (res: number) => {
        this.userCount.nativeElement.setAttribute('data-percent', res);
      },
      (error: any) => {
        console.error('error when fetching user count');
      }
    );
    this.clientService.getSoldVehiclesCount().subscribe(
      (res: number) => {
        this.soldVehicles.nativeElement.setAttribute('data-percent', res);
      },
      (error: any) => {
        console.error('error when fetching vehicle count');
      }
    );
  }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);
    this.clientService.getSponsoredCars().subscribe(
      (response: SponsoredCar[]) => {
        console.log('Response Sponsored: ', response);
        this.sponsoredCars = response.map(
          (elem: SponsoredCar) => elem.autoSemiNuevo
        );
        console.log(this.sponsoredCars);
      },
      (error: any) => {
        console.log('Error fetching sponsoredCars: ', error);
      }
    );

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

    this.clientService.getRecentCars().subscribe(
      (response: AutoSemiNuevo[]) => {
        this.recentCars = response;
        this.loaderService.setIsLoading(false);
      },
      (error: any) => {
        console.log('Error fetching recentCars: ', error);
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
    $('#marcas').selectpicker('refresh');
    // setTimeout(() => {

    // }, 500);
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

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
