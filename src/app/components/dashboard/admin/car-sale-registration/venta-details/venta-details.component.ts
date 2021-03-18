import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutoInteresado } from 'src/app/core/interfaces/auto-interesado';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-venta-details',
  templateUrl: './venta-details.component.html',
  styleUrls: ['./venta-details.component.css']
})
export class VentaDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VentaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AutoInteresado,
    private router: Router,
    public commonService: CommonService,
  ) {
    console.group('Dialog Data');
    console.dir(data);
    console.groupEnd();
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
