import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

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
  isConvoOpen: boolean = false;

  typedMessage: any;
  friendsArr: any = [];
  convoArr: any = [];
  chatsArr: any = [];

  currentUser = {
    userId: null,
    username: '',
  };

  convoData = {
    userId: null,
    username: null,
    convoId: null,
  };

  defaultImgLink = '../../../../../assets/images/chan.jpg';

  @ViewChild('btnScroll') scrollEl: any;

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
    this.loadFriends();
    this.getUserPresence();
    this.loadUserMsgs();
  }

  getCurrentUserData() {
    this.profileService.getProfileData().subscribe(
      (response: any) => {
        this.currentUser.userId = response.id;
        this.currentUser.username = response.name;
      },
      (error) => console.log(error)
    );
  }

  getUserPresence() {
    this.eventsService.getUserPresence().subscribe((res) => {
      this.loadFriends();
    });
  }

  loadUserMsgs() {
    this.chatService.getUserMsgs().subscribe(
      (response: any) => {
        this.chatsArr = response.messages;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadConvoMessages(convoId: any, hasConvo: boolean) {
    return this.chatService.getConvo({ convoId, hasConvo }).subscribe(
      (response: any) => {
        this.convoArr = response.convo;
        console.log(this.convoArr);
      },
      (error) => {
        console.log(error);
      }
    );

    // return this.chatService.getConvo(convoId).subscribe((messageData: any) => {
    //   // this.convoDatas.push({
    //   //   userMessage: messageData.message,
    //   //   senderId: messageData.sender,
    //   // });

    //   // console.log(this.convoDatas);

    //   this.testScroll();
    // });
  }

  closeConvoPanel() {
    this.convoArr = [];
    this.isConvoOpen = false;
  }

  openConvoPanel(num: number, data: any) {
    if (num == 1) {
      this.convoData.userId = data.id;
      this.convoData.username = data.name;
      this.loadConvoMessages(
        { par1: data.id, par2: this.currentUser.userId },
        false
      );
    } else {
      const userId = this.currentUser.userId;
      const isOtherUser = data.sender.id != userId;

      this.convoData.userId = isOtherUser ? data.sender.id : data.receiver.id;
      this.convoData.username = isOtherUser
        ? data.sender.name
        : data.receiver.name;
      this.convoData.convoId = data.id || null;
      // load user messages
      this.loadConvoMessages(data.id, true);
    }

    this.isConvoOpen = true;
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.typedMessage) {
      this.chatService.sendMessage({
        message: this.typedMessage,
        sender: this.currentUser.userId,
        receiver: this.convoData.userId,
        convoId: this.convoData.convoId,
      });

      this.convoArr.push({
        text: this.typedMessage,
      });

      this.typedMessage = '';
      this.testScroll();
    }
  }

  loadFriends() {
    this.friendService.getUsers().subscribe(
      (response: any) => {
        this.friendsArr = response.users;

        console.log(this.friendsArr);
      },
      (error) => {
        console.log(error);
      }
    );
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
