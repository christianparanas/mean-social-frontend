import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket, private http: HttpClient) {}

  sendMessage(userMessageData: any) {
    this.socket.emit('sendMsg', userMessageData);
  }

  getMessages(): Observable<string> {
    return this.socket.fromEvent<string>('newMsg');
  }

  getUserMsgs() {
    return this.http.get(`${baseURL}/api/chats`);
  }

  startConversation(data: any) {
    return this.http.post(`${baseURL}/api/chats`, data);
  }
}
