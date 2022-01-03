import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ChatService } from '../../shared/services/chat.service';
import { ProfileService } from '../../shared/services/profile.service';
import { FriendService } from '../../shared/services/friend.service';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  onScroll: boolean = false;
  userMessage: any;
  openMsg: boolean = false;
  msgId: number;
  friendsArr: any = []

  currentUser = {
    userId: null,
    username: '',
  };

  specificMsg = {
    userId: null,
    username: null
  }

  @ViewChild('btnScroll') scrollEl: any;

  mgsArr = [
    {
      name: 'Luigi Loreno',
      latestMsg: 'Ano kuno?',
      dateOrTime: '10:01 AM',
      imgURL: '../../../../../assets/images/chan.jpg',
      msgID: 1,
    },
  ];

  specificMsgs: any = [];

  constructor(
    private location: Location,
    private chatService: ChatService,
    private profileService: ProfileService,
    private friendService: FriendService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    window.addEventListener('scroll', this.listenScrollEvent);
    this.getCurrentUserData();
    this.loadFriends()
    this.getUserPresence()
    this.loadUserMsgs()
  }

  getCurrentUserData() {
    this.profileService.getProfileData().subscribe(
      (response: any) => {
        console.log(response);

        this.currentUser.userId = response.id;
        this.currentUser.username = response.name;
      },
      (error) => console.log(error)
    );
  }

  getUserPresence() {
    this.eventsService.getUserPresence().subscribe(
      (res) => {
        this.loadFriends()
      }
    )
  }

  loadUserMsgs() {
    this.chatService.getUserMsgs().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  loadSpecificMessages() {
    return this.chatService.getMessages().subscribe((messageData: any) => {
      this.specificMsgs.push({
        userMessage: messageData.message,
        senderId: messageData.sender,
      });

      console.log(this.specificMsgs);

      this.testScroll();
    });
  }

  openSpecificMsg(data: any) {
    this.specificMsg.userId = data.id
    this.specificMsg.username = data.name

    this.openMsg = true;

    // load user messages
    this.loadSpecificMessages();

    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userMessage) {
      this.chatService.sendMessage({
        message: this.userMessage,
        sender: this.currentUser.userId,
        reciever: this.specificMsg.userId
      });

      this.userMessage = '';
      this.testScroll();
    }
  }

  loadFriends() {
    this.friendService.getUsers().subscribe(
      (response: any) => {
        console.log(response)
        this.friendsArr = response.users
      },
      (error) => {
        console.log(error)
      }
    )
  }

  goBack() {
    this.location.back();
  }

  listenScrollEvent = () => {
    window.scrollY > 15 ? (this.onScroll = true) : (this.onScroll = false);
  };

  scrollToBottom() {
    setTimeout(() => {
      this.scrollEl.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  testScroll() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }
}
