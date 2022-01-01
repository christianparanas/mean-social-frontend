import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ChatService } from '../../shared/services/chat.service';
import { ProfileService } from '../../shared/services/profile.service';

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

  currentUser = {
    userId: null,
    username: '',
  };

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

  specificMsgs: any = [
    {
      userId: 1,
      username: 'thea',
      userMessage: 'Hain na an at mga saad?',
      userImage: '../../../../../assets/images/chan.jpg',
    },
  ];

  constructor(
    private location: Location,
    private chatService: ChatService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    window.addEventListener('scroll', this.listenScrollEvent);
    this.getCurrentUserData();
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

  loadSpecificMessages() {
    return this.chatService.getMessages().subscribe((messageData: any) => {
      this.specificMsgs.push({
        userMessage: messageData.message,
        userId: messageData.userId,
      });

      console.log(this.specificMsgs);

      this.testScroll();
    });
  }

  openSpecificMsg(msgID: number) {
    this.msgId = msgID;
    this.openMsg = true;

    // load user messages
    this.loadSpecificMessages();

    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userMessage) {
      this.chatService.sendMessage({
        message: this.userMessage,
        userId: this.currentUser.userId,
      });

      this.userMessage = '';
      this.testScroll();
    }
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
