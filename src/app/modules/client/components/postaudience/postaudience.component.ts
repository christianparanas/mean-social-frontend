import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-postaudience',
  templateUrl: './postaudience.component.html',
  styleUrls: ['./postaudience.component.scss'],
})
export class PostaudienceComponent implements OnInit {
  @Output() setAudienceEvent = new EventEmitter();
  isPostAudienceModalOpen: boolean = false;
  selectedAudience: any = ['public', 'fal fa-globe'];
  postAudienceArray: any = [
    {
      isSelected: true,
      id: 'public',
      icon: 'fal fa-globe-asia',
      title: 'Public',
      description: 'Anyone on or off Lorem',
    },
    {
      isSelected: false,
      icon: 'fal fa-users',
      title: 'Friends',
      id: 'friends',
      description: 'Your friends on Lorem',
    },
    {
      isSelected: false,
      icon: 'fal fa-lock',
      id: 'onlyme',
      title: 'Only me',
      description: 'Only you can see your post',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  openClosePostAudienceModal() {
    this.isPostAudienceModalOpen = !this.isPostAudienceModalOpen;
  }

  setAudience() {
    this.setAudienceEvent.emit({
      aud: this.selectedAudience[0],
      icon: this.selectedAudience[1],
    });

    // close aud modal
    this.openClosePostAudienceModal()
  }

  // unselect other checkbox if one of them is selected
  unselectCheckbox(audTitle: any) {
    this.postAudienceArray.map((each: any) => {
      if (each.title != audTitle) {
        each.isSelected = false;
      } else {
        each.isSelected = true;
        this.selectedAudience[0] = each.id;
        this.selectedAudience[1] = each.icon;
      }
    });
  }
}
