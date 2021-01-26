import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { DataService } from 'src/app/core/services/data.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-published-cars',
  templateUrl: './published-cars.component.html',
  styleUrls: ['./published-cars.component.css']
})
export class PublishedCarsComponent implements OnInit {

  // * cars
  carros: AutoSemiNuevo[] = [];
  filteredCarros: AutoSemiNuevo[] = [];

  // * pages
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
        return carro.precioVenta >= this.minPrice && carro.precioVenta <= this.maxPrice;
      });
      return "";
    }
  };

  constructor(
    private dataService: DataService,
    private userService: UserService,
  ) {
    this.userService.getAutoSemiNuevoPageCount().subscribe(
      (response: number) => {
        console.group('page cnt res:');
        console.log(response);
        console.groupEnd();
        let pgCnt: number = Math.ceil(response/this.carsPerPage);
        this.pages = Array(pgCnt).fill(pgCnt).map((x: any, i: any) => i);
      },
      (error: any) => {
        console.group('error getting auto seminuevo page cnt');
        console.log(error);
        console.groupEnd();
      }
    );

    this.userService.getAutosSemiNuevosValidados(0).subscribe(
      (response: AutoSemiNuevo[]) => {
        console.group(`initial autoseminovos response`);
        console.log(response);
        console.groupEnd();

        this.carros = response;
        this.filteredCarros = this.carros;
      },
      (error: any) => {
        console.group(`[ERROR]: published cars, initial: ${error}`);
      }
    );

  }

  ngOnInit(): void {
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredCarros = this.carros.filter((carro: any) => {
      return this._normalizeValue(carro.name).includes(normalizedQuery);
    });
  }

  goToPage(pageId: number): void {
    this.userService.getAutosSemiNuevosValidados(pageId).subscribe(
      (response: AutoSemiNuevo[]) => {
        console.group(`goToPage(${pageId}) response`);
        console.log(response);
        console.groupEnd();

        this.currPage = pageId;
        this.carros = response;
        this.filteredCarros = this.carros;

      },
      (error: any) => {
        console.group(`[ERROR]: published cars, goToPage(${pageId}): ${error}`);
      }
    );
  }

}
