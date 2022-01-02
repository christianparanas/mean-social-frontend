import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';

// import service
import { FriendService } from '../../shared/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  usersArray: any = []

  constructor(private friendService: FriendService, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadUsers()
    this.getUserPresence()
  }

  getUserPresence() {
    this.eventsService.getUserPresence().subscribe(
      (res) => {
        this.loadUsers()
      }
    )
  }

  loadUsers() {
    this.friendService.getUsers().subscribe(
      (response: any) => {
        console.log(response);
        this.usersArray = response.users
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
