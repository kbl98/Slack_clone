import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatMenuTrigger } from '@angular/material/menu';
import { DirectChat } from 'src/models/directChat.class';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { TextBoxComponent } from '../text-box/text-box.component';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-create-direct-message',
  templateUrl: './create-direct-message.component.html',
  styleUrls: ['./create-direct-message.component.scss'],
})
export class CreateDirectMessageComponent implements OnInit {
  private routeSub: Subscription;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('messagetext') messagetext: TextBoxComponent;
  disabledTrigger = false;
  messageTo;
  overview = false;
  userEmails = [];
  users = [];
  currentChatpartner;
  loggedUser;
  loggedUserId;
  allMessages;
  loggedUser$;
emailUser=[]

  ngOnInit() {
    this.getUserId();
    //this.getUsers();
    //console.log(this.users);
    //this.getloggedUser();
    //console.log(this.loggedUser);
    this.routeSub = this.route.params.subscribe((params) => {
      this.getUsers();
      this.getloggedUser();
    });
   
  }

  closeMenu() {
    this.trigger.closeMenu();
  }

  getUserId() {
    this.route.parent.paramMap.subscribe((paraMap) => {
      this.loggedUserId = paraMap.get('id');
    });
  }

  getChatpartner() {
    this.route.paramMap.subscribe((paraMap) => {
      let currentChatpartner = paraMap.get('chatpartner') || '';
      this.currentChatpartner = this.users.find(
        (user) => user.username === currentChatpartner
      );
      if (!this.currentChatpartner) {
        this.overview = false;
      } else {
        this.overview = true;
      }
    });
  }

  getloggedUser() {
    this.loggedUser$ = new Observable((observer) => {
      this.firestore
        .collection('users')
        .doc(this.loggedUserId)
        .valueChanges()
        .subscribe((user) => {
          this.loggedUser = new User(user);
          this.getChatpartner(),
            this.getMessages(),
            this.dateToString(),
            this.setChatpartnerEmail();
            this.emailUser=this.users;
          observer.next();
          observer.complete();
        });
      observer.next();
      observer.complete();
    });
    this.loggedUser$.subscribe();
  }

  onInputChange(): void {
    this.trigger.openMenu();
    this.filterUserDropDown();
  }

  writeContact(contact) {
    this.messageTo = contact;
    this.overview = false;
    this.getNewChatpartner();
  }


  async getUsers() {
    await this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes) => {
        this.users = changes;
      });
  }

  //filter users for current selected email;
  getNewChatpartner() {
    this.currentChatpartner = this.users.find(
      (user) => user.email === this.messageTo
    );
  }

  setChatpartnerEmail() {
    if (this.currentChatpartner) {
      this.messageTo = this.currentChatpartner.email;
    }
  }

  getMessages() {
    if (this.overview) {
      this.allMessages = this.loggedUser.userMassages.filter((message) => {
        return (
          message.chatpartner == this.currentChatpartner.username ||
          message.author == this.currentChatpartner.username
        );
      });
    }
  }

  getPictureOfAuthor(message){
      let author=this.users.find((user)=>user.username===message.author);
      return author.userpicture
    }
  

  sortMessages() {
    this.allMessages[0]['messages'].sort((a, b) => a.date - b.date);
  }

  dateToString() {
    if (this.overview) {
      for (let i = 0; i < this.allMessages.length; i++) {
        let timestamp = this.allMessages[i]['date'];
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        );
        const dateString = date.toLocaleString('de-DE', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });
        this.allMessages[i]['datestring'] = dateString;
      }
    }
  }

  async saveMessage() {
    this.checkMessageTo();
    if(this.messageTo !==""){
    let message = new Message();
    message.author = this.loggedUser.username;
    message.text = this.messagetext.message;
    message.date = this.dateToTimestamp();
    message.chatpartner = this.currentChatpartner.username;
    this.saveMessageToChatpartner(message);
    this.saveMessageToLogged(message);
    }
  }

  async saveMessageToLogged(message){
    this.loggedUser.userMassages.push(message.toJSON());
    this.pushNewChatpartner(this.currentChatpartner.username);
    await this.firestore
      .collection('users')
      .doc(this.loggedUserId)
      .update(this.loggedUser.toJSON())
      .then((result) => {
      });
  }

  async saveMessageToChatpartner(message) {
    this.currentChatpartner.userMassages.push(message.toJSON());
    this.pushNewChatpartnerToChatpartner(this.loggedUser.username);
    await this.firestore
      .collection('users')
      .doc(this.currentChatpartner.customIdName)
      .update(this.currentChatpartner)
      .then((result) => {
      });
  }

  dateToTimestamp() {
    const now = new Date();
    const seconds = Math.floor(now.getTime() / 1000);
    const nanoseconds = (now.getTime() % 1000) * 1000000;
    const timestamp = { seconds: seconds, nanoseconds: nanoseconds };
    return timestamp;
  }

  pushNewChatpartner(chatpartnerUsername) {
    let index = this.loggedUser.chatpartner.findIndex(
      (partner) => partner === chatpartnerUsername
    );
    if (index === -1) {
      this.loggedUser.chatpartner.push(this.currentChatpartner.username);
    }
  }

  pushNewChatpartnerToChatpartner(loggedUsername) {
    let index = this.currentChatpartner.chatpartner.findIndex(
      (partner) => partner === loggedUsername
    );
    if (index === -1) {
      this.currentChatpartner.chatpartner.push(this.loggedUser.username);
    }
  }

  checkMessageTo(){
    let index=this.users.findIndex((user)=>user.email===this.messageTo);
    console.log(index);
    if(index=== -1){
      this.overview=false;
      this.messageTo="";
      document.getElementById("messageTo").style.backgroundColor="red";
      setTimeout(()=>{document.getElementById("messageTo").style.backgroundColor="white";
      },1000);
      this.router.navigateByUrl('main/'+ this.loggedUserId + '/main/:id/userchat');
    }
  }

  filterUserDropDown(){
    console.log(this.messageTo)
    let input=this.messageTo.toLowerCase();
   this.emailUser=this.users.filter((user)=>user.email.toLowerCase().includes(input))
  }
}
