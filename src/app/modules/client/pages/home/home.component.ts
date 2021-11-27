import { Component, OnInit } from '@angular/core';

import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postsArray: any = new Array(4)
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (response: any) => {
        console.log(response)
        this.postsArray = response.posts
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
