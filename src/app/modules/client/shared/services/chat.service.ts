import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(userMessageData: any) {
    this.socket.emit('sendMsg', userMessageData);
  }

  getMessages(): Observable<string> {
    return this.socket.fromEvent<string>('newMsg');
  }
}
