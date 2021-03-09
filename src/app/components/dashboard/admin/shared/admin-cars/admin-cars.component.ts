import { Component, Input, OnInit } from '@angular/core';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';
import { AdminService } from 'src/app/core/services/admin.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {
  @Input() name!: string;

  list: boolean = true;

  // * carros
  carros: AutoSemiNuevo[] = [];
  filteredCarros: AutoSemiNuevo[] = [];

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 10;

  constructor(
    private loaderService: LoaderService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.loaderService.setIsLoading(true);

    this.adminService.getAutosNoValidados().subscribe(
      (response: AutoSemiNuevo[]) => {
        console.group('Autos No Validados');
        console.log(response);
        console.groupEnd();

        this.carros = response;
        this.filteredCarros = response;
        this.loaderService.setIsLoading(false);
      },
      (error: any) => {
        console.error('fetching autos no validados: ', error);
        this.loaderService.setIsLoading(false);
      }  
    );

  }

  validateCar(id: number): void {
    console.group('Validate Car with Id:');
    console.log(id);
    console.groupEnd();

    Swal.fire({
      title: '¿Quieres validar este carro?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this.adminService.putAutoSemiNuevoById(id).subscribe(
          (response: AutoSemiNuevo) => {
            if (response.id! === id) {
              Swal.fire('¡Auto validado!', '', 'success');
              this.ngOnInit();
            }
          },
          (error: any) => {
            Swal.fire('¡Oops!', 'Ocurrió un error. Inténtalo de nuevo.', 'error')
            console.error('when validating car with id: ', id, ' error: ', error);
          }
        );
      }
    });
  }

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  filterByName(event: any): void {
    const normalizedQuery: string = this._normalizeValue(event.target.value);
    this.filteredCarros = this.carros.filter(
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

  private updatePagination(): void {
    this.currPage = 0;
    this.pgCnt = Math.ceil(this.filteredCarros.length / 10);
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
