import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(data: any) {
    return this.http.post(`${baseURL}/api/posts/`, data);
  }

  getPosts() {
    return this.http.get(`${baseURL}/api/posts/`);
  }

  reactPost(data: any) {
    return this.http.post(`${baseURL}/api/posts/react`, data)
  }
}
