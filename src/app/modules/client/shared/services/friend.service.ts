import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${baseURL}/api/users`);
  }

  getUserChats() {
    return this.http.get(`${baseURL}/api/users/chats`);
  }
}
