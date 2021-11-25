import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  isCreatePostModalOpen: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  openCloseCreatePostModal() {
    this.isCreatePostModalOpen = !this.isCreatePostModalOpen
  }

}
