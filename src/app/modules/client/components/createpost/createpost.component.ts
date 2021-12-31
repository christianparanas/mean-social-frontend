import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss'],
})
export class CreatepostComponent implements OnInit {
  @Output() postedEvent = new EventEmitter<string>();
  isCreatePostModalOpen: boolean = true;
  disablePostBtn: boolean = true;
  isPosting: boolean = false;
  isPostingLabel: string = 'Post';

  postContent: any = {
    privacy: 'public',
    textContent: '',
    icon: 'fal fa-globe',
  };

  constructor(
    private postService: PostService,
    private toast: HotToastService
  ) {}

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
    // disable post btn to prevent multi click on btn
    this.disablePostBtn = true;
    this.isPosting = true;
    this.isPostingLabel = 'Posting';

    this.postService
      .createPost({
        textContent: this.postContent.textContent,
        privacy: this.postContent.privacy,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.toast.success('Posted!', {
            theme: 'snackbar',
            position: 'bottom-center',
          });
          this.openCloseCreatePostModal();
          this.reloadPostOnPosted();

          // clear input
          this.postContent.textContent = '';
          this.isPosting = false;
          this.isPostingLabel = 'Post';
        },
        (error) => {
          console.log(error);

          // enable btn
          this.disablePostBtn = false;
          this.isPosting = false;
          this.isPostingLabel = 'Post';
          this.toast.error('Something went wrong!', {
            theme: 'snackbar',
            position: 'bottom-center',
          });
        }
      );
  }

  setAudience(event: any) {
    this.postContent.privacy = event.aud;
    this.postContent.icon = event.icon;
  }

  reloadPostOnPosted(): void {
    this.postedEvent.emit();
  }
}
