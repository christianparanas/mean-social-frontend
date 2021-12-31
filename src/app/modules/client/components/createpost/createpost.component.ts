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
  isCreatePostModalOpen: boolean = false;
  disablePostBtn: boolean = true;

  postContent: any = {
    privacy: 'OnlyMe',
    textContent: '',
  };

  constructor(private postService: PostService, private toast: HotToastService) {}

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
        (response: any) => {
          console.log(response);
          this.toast.success(response.message, { position: 'top-right' })
          this.openCloseCreatePostModal()
          this.reloadPostOnPosted()

          // clear input
          this.postContent.textContent = ""
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reloadPostOnPosted(): void {
    this.postedEvent.emit();
  }
}
