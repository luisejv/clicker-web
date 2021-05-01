import { Component, Input, OnInit } from '@angular/core';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { StorageService } from 'src/app/core/services/storage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fold', [
      transition(':enter', [
        style({ height: 0, overflow: 'hidden' }),
        animate('.3s ease', style({ height: '*' })),
      ]),
      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        animate('.3s ease', style({ height: 0 })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  // @Input() mobile: boolean = false;

  @Input() isAdmin!: boolean;
  @Input() isUser!: boolean;
  @Input() isRemax!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
