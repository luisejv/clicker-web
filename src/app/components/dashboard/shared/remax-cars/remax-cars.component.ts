import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InteresadoReventa } from 'src/app/core/interfaces/interesado-reventa';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-remax-cars',
  templateUrl: './remax-cars.component.html',
  styleUrls: ['./remax-cars.component.css']
})
export class RemaxCarsComponent implements OnInit, OnChanges {

  @Input() name!: string;
  @Input() interestedCarros!: InteresadoReventa[];

  filteredInterestedCarros!: InteresadoReventa[];

  // * pages
  pgCnt: number = 0;
  pages: number[] = [0];
  currPage: number = 0;
  carsPerPage: number = 10;

  // * responsive
  list: boolean;
  len: number = 0;

  constructor(
    private commonService: CommonService,
  ) {
    if (this.commonService.screenWidth <= 1060) {
      this.list = false
    } else {
      this.list = true;
    }

    this.commonService.changeLayoutEvent.subscribe(
      () => {
        this.changeGridView('grid');
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.interestedCarros && this.interestedCarros.length > 0) {
      this.filteredInterestedCarros = this.interestedCarros;
    }
  }

  ngOnInit(): void {
  }

  changeGridView(type: string): void {
    this.list = type == 'list';
  }

  filterByName(event: any): void {
    //TODO:
  }

  private updatePagination(): void {
    this.currPage = 0;
    this.pgCnt = Math.ceil(this.len / 10);
    this.pages = Array(this.pgCnt)
      .fill(this.pgCnt)
      .map((x: any, i: any) => i);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  sortBy(e: any): void {
  }

  goToPage(pageId: number): void {
    this.currPage = pageId;
    //FIXME: este scrollTo da chongos en la vista de iPad
    window.scrollTo(0, 0);
  }

}
