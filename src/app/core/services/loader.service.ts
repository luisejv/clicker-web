import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../../components/shared/spinner/spinner.model';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  isLoading = new EventEmitter<boolean>();

  loading!: boolean;

  constructor() {}

  setIsLoading(loading: boolean): void {
    this.isLoading.emit(loading);
    this.loading = loading;
  }

  getIsLoading(): boolean {
    return this.loading;
  }

  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
