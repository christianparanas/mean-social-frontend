import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { MenuItem } from 'primeng/api';

import { ProfileService } from '../../shared/services/profile.service'
import { PostService } from '../../shared/services/post.service'

@Component({
  selector: 'app-postcontainer',
  templateUrl: './postcontainer.component.html',
  styleUrls: ['./postcontainer.component.scss'],
})
export class PostcontainerComponent implements OnInit {
  @Input() postArray: any;
  @Output() callParentMeth = new EventEmitter<any>();
  items: MenuItem[];
  currentUserId: any = null

  constructor(private profileService: ProfileService, private postService: PostService) {}

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

  reactPost(postData: any) {
    const data = {
      postId: postData[0],
      likerId: postData[1]
    }

    this.postService.reactPost(data).subscribe(
      (response: any) => {
        console.log(response)
        this.refreshPosts()
    },
    (error: any) => {
      console.log(error)
    })
  }

  isAlreadyReacted(likersArr: any) {
    let isTrue = false

    if(likersArr.length == 0) return false
    
    likersArr.map((liker: any) => {
      if(liker.user.id == this.currentUserId) {
        isTrue = true
      }
    })

    return isTrue
  }

  convertPostData(date: any): any {
    return moment(date).fromNow();
  }

  refreshPosts() {
    this.callParentMeth.emit()
  }
}
