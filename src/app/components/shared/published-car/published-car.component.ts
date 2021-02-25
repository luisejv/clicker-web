import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';

@Component({
  selector: 'app-published-car',
  templateUrl: './published-car.component.html',
  styleUrls: ['./published-car.component.css'],
})
export class PublishedCarComponent implements OnInit {
  @Input() auto!: AutoSemiNuevo;
  @Input() mode: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToVehicleDetails(): void {
    console.log('clicc');
    this.router.navigate(['/auto-semi-nuevo'], {
      queryParams: {
        id: this.auto.id,
      },
    });
  }
}
