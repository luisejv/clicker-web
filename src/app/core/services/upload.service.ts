import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  folder: string = 'clicker-prueba-imagenes/';
  constructor() {}

  uploadFile(file: File) {
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: '3JNQKLDIYTBD6EMZUVDG',
      secretAccessKey: 'qHjOdn60eSIL0HnsZ2yRAjcE6zCtPyhbGvWYaN/1RQE',
      region: 'NYC3',
    });
    const params = {
      Bucket: 'data-clicker-pruebas',
      Key: this.folder + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    bucket.upload(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return data;
    });
  }
}
