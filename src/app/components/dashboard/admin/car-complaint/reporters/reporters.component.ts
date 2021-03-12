import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Denuncia } from 'src/app/core/interfaces/denuncia';

@Component({
  selector: 'app-reporters',
  templateUrl: './reporters.component.html',
  styleUrls: ['./reporters.component.css']
})
export class ReportersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Denuncia[],
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
