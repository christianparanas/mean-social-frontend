import { Component, Input, OnInit } from '@angular/core';
import * as moment from "moment"

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-postcontainer',
  templateUrl: './postcontainer.component.html',
  styleUrls: ['./postcontainer.component.scss'],
})
export class PostcontainerComponent implements OnInit {
  @Input() postArray: any;
  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Edit Post',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Edit Privacy',
        icon: 'pi pi-fw pi-lock',
      },
      {
        label: 'Hide Post',
        icon: 'pi pi-fw pi-times-circle',
      },
    ];
  }

  convertPostData(date: any): any {
    return moment(date).fromNow()
  } 
}
