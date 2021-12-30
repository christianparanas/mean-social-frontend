import { Component, OnInit } from '@angular/core';

// import service
import { FriendService } from '../../shared/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  usersArray: any = []

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.loadUsers()
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
