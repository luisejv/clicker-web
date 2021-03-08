import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnChanges {
  @Input() isPrincipal: boolean = false;
  @Input() foto!: FileList;
  @Output() image = new EventEmitter<FileList>();

  imagePath: any;
  imgURL: any;
  message!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.foto && changes.foto.currentValue) {
      if (this.foto.length == 0) {
        return;
      }
      if (this.foto[0].type.match(/image\/*/) == null) {
        this.message = 'Solo se pueden subir imágenes.';
        return;
      }
      let reader = new FileReader();
      this.imagePath = this.foto;
      reader.readAsDataURL(this.foto[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.image.emit(this.foto);
      };
    }
  }
}
