import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
const baseURL = environment.baseURL;


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private socket: Socket, private http: HttpClient) { }

  sendNewMessageNotification(data: any) {
    this.socket.emit('messageNotification', data)
  }

  getNewMsgNotif(): Observable<string> {
    return this.socket.fromEvent<string>('msgNotif');
  }

  sendNewPostIndicator() {
    this.socket.emit('newPost');
  }

  getNewPostIndicator(): Observable<string> {
    return this.socket.fromEvent<string>('newPostIndicator');
  }

  sendUserOnlineIndicator(data: any) {
    this.socket.emit('userOnline', data)
  }

  getUserPresence(): Observable<string> {
    return this.socket.fromEvent<string>('userChangeStatus');
  }
}
