import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postaudience',
  templateUrl: './postaudience.component.html',
  styleUrls: ['./postaudience.component.scss']
})
export class PostaudienceComponent implements OnInit {
  isPostAudienceModalOpen: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  openClosePostAudienceModal() {
    this.isPostAudienceModalOpen = !this.isPostAudienceModalOpen;
  }

}
