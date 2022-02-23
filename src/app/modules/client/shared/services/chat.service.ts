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

  getEmitMsg(): Observable<string> {
    return this.socket.fromEvent<string>('newMsg');
  }

  joinRoom(userMessageData: any) {
    this.socket.emit('join', userMessageData);
  }

  getConvo(datas: any) {
    const data = {
      id: datas.convoId,
      hasConvo: datas.hasConvo
    }

    return this.http.post(`${baseURL}/api/chats/convo`, data)
  }

  getUserMsgs() {
    return this.http.get(`${baseURL}/api/chats`);
  }

  startConversation(data: any) {
    return this.http.post(`${baseURL}/api/chats`, data);
  }
}
