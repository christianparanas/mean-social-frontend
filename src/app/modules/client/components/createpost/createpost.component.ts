import { Component, OnInit } from '@angular/core';

import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss'],
})
export class CreatepostComponent implements OnInit {
  isCreatePostModalOpen: boolean = false;
  disablePostBtn: boolean = true;

  postContent: any = {
    privacy: 'OnlyMe',
    textContent: '',
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  openCloseCreatePostModal() {
    this.isCreatePostModalOpen = !this.isCreatePostModalOpen;
  }

  sole() {
    if (this.postContent.textContent.length == 0) {
      this.disablePostBtn = true;
      return;
    }

    console.log(this.postContent.textContent);
    this.disablePostBtn = false;
  }

  onSubmit() {
    this.postService
      .createPost({
        textContent: this.postContent.textContent,
        privacy: this.postContent.privacy,
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
