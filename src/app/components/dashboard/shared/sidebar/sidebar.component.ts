import { Component, Input, OnInit } from '@angular/core';
import { RolesEnum } from 'src/app/core/enums/roles.enum';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  // @Input() mobile: boolean = false;

  @Input() isAdmin!: boolean;
  @Input() isUser!: boolean;
  @Input() isRemax!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
