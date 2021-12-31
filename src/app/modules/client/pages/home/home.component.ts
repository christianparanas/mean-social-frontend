import { Component, OnInit } from '@angular/core';

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
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadUser();
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
