import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { AutoSemiNuevo } from 'src/app/core/interfaces/auto-semi-nuevo';

@Component({
  selector: 'app-published-car',
  templateUrl: './published-car.component.html',
  styleUrls: ['./published-car.component.css'],
})
export class PublishedCarComponent implements OnInit, OnChanges {
  @Input() auto!: AutoSemiNuevo | AutoReportado;
  @Input() mode: boolean = true;
  @Input() validationView: boolean = false;
  @Input() reportedView: boolean = false;

  @Output() validated = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();
  @Output() reportedIsValid = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.group('Changes');
    console.dir(changes);
    console.groupEnd();

    // if (changes.auto.firstChange) {
    //   console.group('Auto Publicado');
    //   console.dir(this.auto);
    //   console.groupEnd();
      
    // }

  }

  seeLosQueReportaron(): void {
    //TODO: mostrar dialog con los que reportaron (auto.denuncias tiene un Denuncia[]) crear el dialog en base a dicha interfaz
    console.log("ver los q reportaron");
  }

  goToVehicleDetails(): void {
    console.log('clicc');
    this.router.navigate(['/auto-semi-nuevo'], {
      queryParams: {
        id: this.auto.id,
      },
    });
  }

  emitValidationEvent(): void {
    this.validated.emit(this.auto.id!);
  }

  emitMarkAsValidEvent(): void {
    this.reportedIsValid.emit(this.auto.id!);
  }

  emitRemoveEvent(): void {
    this.removed.emit(this.auto.id!);
  }

}
