/// <reference types="aws-sdk" />
import { EventEmitter, Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  folder: string = 'clicker-prueba-imagenes/';
  uploadedData = new EventEmitter<any>();
  constructor() {}

  uploadFile(file: File): void {
    const contentType = file.type;
    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
    const bucket = new S3({
      endpoint: spacesEndpoint,
      accessKeyId: '3JNQKLDIYTBD6EMZUVDG',
      secretAccessKey: 'qHjOdn60eSIL0HnsZ2yRAjcE6zCtPyhbGvWYaN/1RQE',
      region: 'NYC3', // ? Puede que no se necesite
    });
    const params = {
      Bucket: 'data-clicker-pruebas',
      Key: this.folder + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        this.uploadedData.error(err);
      }
      console.log('Successfully uploaded file.', data.Location);
      this.uploadedData.emit(data.Location);
    });
  }
}
