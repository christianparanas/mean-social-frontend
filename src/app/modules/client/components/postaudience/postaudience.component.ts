import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postaudience',
  templateUrl: './postaudience.component.html',
  styleUrls: ['./postaudience.component.scss'],
})
export class PostaudienceComponent implements OnInit {
  isPostAudienceModalOpen: boolean = false;
  postAudienceArray: any = [
    {
      isSelected: false,
      icon: 'fal fa-globe',
      title: 'Public',
      description: 'Anyone on or off Lorem',
    },
    {
      isSelected: false,
      icon: 'fal fa-users',
      title: 'Friends',
      description: 'Your friends on Lorem',
    },
    {
      isSelected: true,
      icon: 'fal fa-lock',
      title: 'Only me',
      description: 'Only you can see your post',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  openClosePostAudienceModal() {
    this.isPostAudienceModalOpen = !this.isPostAudienceModalOpen;
  }

  // unselect other checkbox if one of them is selected
  unselectCheckbox(audTitle: any) {
    this.postAudienceArray.map((each: any) => {
      if (each.title != audTitle) {
        each.isSelected = false;
      } else {
        each.isSelected = true;
      }
    });
  }
}
