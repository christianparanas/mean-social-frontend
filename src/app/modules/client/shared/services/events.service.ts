import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private socket: Socket) {}

  sendNewPostIndicator() {
    this.socket.emit('newPost');
  }

  getNewPostIndicator(): Observable<string> {
    return this.socket.fromEvent<string>('newPostIndicator');
  }
}
