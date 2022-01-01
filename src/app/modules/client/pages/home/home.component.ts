import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';

import { PostService } from '../../shared/services/post.service';
import { SupabaseService } from '../../shared/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postsArray: any = new Array(3);

  constructor(
    private postService: PostService,
    private supabaseService: SupabaseService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadUser();

    this.getNewPostIndicator();
  }

  getNewPostIndicator() {
    this.eventsService
      .getNewPostIndicator()
      .subscribe((response) => console.log(response));
  }

  loadUser() {
    console.log(this.supabaseService.getUser);
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (response: any) => {
        console.log(response);

        this.postsArray = response.posts;
      },
      (error) => {
        console.log(error);
        this.postsArray = null;
      }
    );
  }
}
