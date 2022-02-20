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
  convoArr: any = []
  chatsArr: any = [];

  currentUser = {
    userId: null,
    username: '',
  };

  specificMsg = {
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
    this.loadChatFriends();
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

  loadSpecificMessages(convoId: any) {

    return this.chatService.getConvo(convoId).subscribe(
      (response: any) => {
        
        this.convoArr = response.convo
        console.log(this.convoArr);
      },
      (error) => {
        console.log(error);
      }
    );

    // return this.chatService.getConvo(convoId).subscribe((messageData: any) => {
    //   // this.specificMsgs.push({
    //   //   userMessage: messageData.message,
    //   //   senderId: messageData.sender,
    //   // });

    //   // console.log(this.specificMsgs);

    //   this.testScroll();
    // });
  }

  closeConvoPanel() {
    this.convoArr = []
    this.isConvoOpen = false
  }

  openSpecificMsg(num: number, data: any) {
    if (num == 1) {
      this.specificMsg.userId = data.id;
      this.specificMsg.username = data.name;
    } else {
      this.specificMsg.userId =
        data.sender.id != this.currentUser.userId
          ? data.sender.id
          : data.receiver.id;
      this.specificMsg.username =
        data.sender.id != this.currentUser.userId
          ? data.sender.name
          : data.receiver.name;
      this.specificMsg.convoId = data.id || null;
    }



    // load user messages
    this.loadSpecificMessages(data.id);
    this.isConvoOpen = true;
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.typedMessage) {
      this.chatService.sendMessage({
        message: this.typedMessage,
        sender: this.currentUser.userId,
        receiver: this.specificMsg.userId,
        convoId: this.specificMsg.convoId,
      });

      this.convoArr.push({
        text: this.typedMessage,
      });

      this.loadSpecificMessages(this.specificMsg.convoId);

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

  loadChatFriends() {
    this.friendService.getUserChats().subscribe(
      (response: any) => {},
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
