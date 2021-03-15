import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutoReportado } from 'src/app/core/interfaces/auto-reportado';
import { Denuncia } from 'src/app/core/interfaces/denuncia';
import { CommonService } from 'src/app/core/services/common.service';

interface DialogData {
  carId: number,
  denuncias: Denuncia[]
}

@Component({
  selector: 'app-reporters',
  templateUrl: './reporters.component.html',
  styleUrls: ['./reporters.component.css']
})
export class ReportersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
  }

  goToCarDetail(): void {
    this.closeDialog();
    this.router.navigate(['/auto-semi-nuevo'], {
      queryParams: {
        id: this.data.carId,
      },
    });
  }

  goToReporterDetail(denuncia: Denuncia): void {
    this.closeDialog();
    //TODO: send to user detail
    console.log("mandar al denunciante que hizo la ", {denuncia});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
