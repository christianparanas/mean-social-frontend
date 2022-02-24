import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { MenuItem } from 'primeng/api';

import { ProfileService } from '../../shared/services/profile.service'

@Component({
  selector: 'app-postcontainer',
  templateUrl: './postcontainer.component.html',
  styleUrls: ['./postcontainer.component.scss'],
})
export class PostcontainerComponent implements OnInit {
  @Input() postArray: any;
  items: MenuItem[];
  currentUserId: any = null

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getCurrentUserId()
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

  getCurrentUserId() {
    this.profileService.getCurrentUserId().subscribe((response: any) => { 
      this.currentUserId = response.userId
    }, 
    (err) => { 
      console.log(err) 
    })
  }

  convertPostData(date: any): any {
    return moment(date).fromNow();
  }
}
