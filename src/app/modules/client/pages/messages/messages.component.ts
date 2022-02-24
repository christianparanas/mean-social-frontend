import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { ChatService } from '../../shared/services/chat.service';
import { ProfileService } from '../../shared/services/profile.service';
import { FriendService } from '../../shared/services/friend.service';
import { EventsService } from '../../shared/services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  onScroll: boolean = false;
  isConvoOpen: boolean = false;
  isNoConvo: boolean = false;
  isNoConvoMsgs: boolean = false;

  typedMessage: any;
  friendsArr: any = [];
  chatsArr: any = [];
  convoArr: any = [];

  currentUser = {
    userId: null,
    username: '',
  };

  convoData: any = {
    userId: null,
    username: null,
    convoId: null,
    isOnline: null
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
    this.convoArr = [];

    window.addEventListener('scroll', this.listenScrollEvent);
    this.getCurrentUserData();
    this.loadFriends();
    this.getUserPresence();
    this.loadUserMsgs();
    this.getRealtimeMsg();
    this.getNewMsgNotif();
  }

  convertPostData(date: any): any {
    return moment(date).format('LT');
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

        console.log(this.chatsArr)

        if (this.chatsArr.length == 0) {
          this.isNoConvo = true;
        } else {
          this.isNoConvo = false;
        }
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
        this.isNoConvoMsgs = response.convo == undefined ? true : false;

        this.isConvoOpen = true;
        this.scrollToBottom();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeConvoPanel() {
    this.loadUserMsgs();
    this.convoArr = [];
    this.isConvoOpen = false;
  }

  openConvoPanel(num: number, data: any) {
    if (num == 1) {
      this.convoData.userId = data.id;
      this.convoData.username = data.name;
      this.convoData.isOnline = data.isOnline;
      this.loadConvoMessages(
        { par1: data.id, par2: this.currentUser.userId },
        false
      );
    } else {
      const userId = this.currentUser.userId;
      const isOtherUser = data.sender.id != userId;

      this.convoData.userId = isOtherUser ? data.sender.id : data.receiver.id;
      this.convoData.username = isOtherUser ? data.sender.name: data.receiver.name;
      this.convoData.convoId = data.id || null;
      this.convoData.isOnline = isOtherUser ? data.sender.isOnline : data.receiver.isOnline;

      // load user messages
      this.loadConvoMessages(data.id, true);
    }

    this.joinRoom();
  }

  getRealtimeMsg() {
    this.chatService.getEmitMsg().subscribe(
      (response: any) => {
        if (this.convoArr == undefined) {
          this.convoArr = [
            {
              text: response.message,
              sender: response.sender,
            },
          ];

          this.isNoConvoMsgs = this.convoArr == undefined ? true : false;
          this.scrollToBottom();
          return;
        }

        this.convoArr.push({
          text: response.message,
          sender: response.sender,
        });

        this.scrollToBottom();
      },
      (error) => console.log(error)
    );
  }

  joinRoom() {
    this.chatService.joinRoom({
      convoId: this.convoData.convoId,
    });
  }

  newMsgNotification(receiverId: any) {
    this.eventsService.sendNewMessageNotification(receiverId);
  }

  getNewMsgNotif() {
    this.eventsService.getNewMsgNotif().subscribe((res) => {
      console.log("new")

      this.loadUserMsgs()
    });
  }

  sendMessage() {
    if (this.typedMessage) {
      this.chatService.sendMessage({
        message: this.typedMessage,
        sender: this.currentUser.userId,
        receiver: this.convoData.userId,
        convoId: this.convoData.convoId,
      })

      this.newMsgNotification(this.convoData.userId);

      this.typedMessage = '';
      this.testScroll();
    }

    
  }

  loadFriends() {
    this.friendService.getUsers().subscribe(
      (response: any) => {
        this.friendsArr = response.users;
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
