import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarSearchFilter } from 'src/app/core/interfaces/car-search-filter';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  ruta: string;

  constructor(private storageService: StorageService, private router: Router) {
    if (this.storageService.isLoggedIn()) {
      this.ruta = '/dashboard/registrar-carro';
    } else {
      this.ruta = '/auth';
    }
  }

  goToCarsSubset(subset: string): void {
    const body: CarSearchFilter = {
      carSubset: subset,
    };
    this.router
      .navigateByUrl('/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/inventory-listings'], { queryParams: body });
      });
  }

  ngOnInit(): void {}
}
