import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';

@Component({
  selector: 'app-published-car',
  templateUrl: './published-car.component.html',
  styleUrls: ['./published-car.component.css'],
})
export class PublishedCarComponent implements OnInit, OnChanges {
  @Input() auto!: AutoSemiNuevo | AutoReportado | AutoInteresado;

  @Input() mode: boolean = true;

  @Input() validationView: boolean = false;
  @Input() reportedView: boolean = false;
  @Input() interestingView: boolean = false;


  @Output() validated = new EventEmitter<number>();

  @Output() removed = new EventEmitter<number>();
  @Output() reportedIsValid = new EventEmitter<number>();
  @Output() showReporters = new EventEmitter<AutoReportado>();

  @Output() sell = new EventEmitter<AutoInteresado>();

  // auto validado y interesado = AutoSemiNuevo
  // auto reportado             = Auto Reportado
  autoCasteado!: AutoSemiNuevo | AutoReportado;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('auto interesado: ', this.auto);
    console.log('interesting view: ', this.interestingView);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.group('Changes');
    console.dir(changes);
    console.groupEnd();

    if (changes.validationView && changes.validationView.firstChange && this.validationView) {
      this.autoCasteado = this.auto as AutoSemiNuevo;
    } else if (changes.reportedView && changes.reportedView.firstChange && this.reportedView) {
      this.autoCasteado = this.auto as AutoReportado;
    } else if (changes.interestingView && changes.interestingView.firstChange && this.interestingView) {
      this.autoCasteado = (this.auto as AutoInteresado).auto as AutoSemiNuevo;
    }

  }

  goToVehicleDetails(): void {
    this.router.navigate(['/auto-semi-nuevo'], {
      queryParams: {
        id: this.autoCasteado.id,
      },
    });
  }

  emitSeeReporters(): void {
   this.showReporters.emit(this.auto as AutoReportado); 
  }

  emitValidationEvent(): void {
    this.validated.emit(this.autoCasteado.id!);
  }

  emitMarkAsValidEvent(): void {
    this.reportedIsValid.emit(this.autoCasteado.id!);
  }

  emitRemoveEvent(): void {
    this.removed.emit(this.autoCasteado.id!);
  }

  emitSaleEvent(): void {
    this.sell.emit(this.auto as AutoInteresado);
  }

}
