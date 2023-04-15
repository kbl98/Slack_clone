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
  @ViewChild('messagetext') messagetext:(TextBoxComponent);
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


  ngOnInit() {
    this.getUserId();
    this.getUsers();
    console.log(this.users)
    this.getloggedUser();
    console.log(this.loggedUser)
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
      console.log(this.loggedUserId);
    });
  }

  getChatpartner() {
    this.route.paramMap.subscribe((paraMap) => {
      this.currentChatpartner = paraMap.get('chatpartner');
      if(!this.currentChatpartner){
        this.overview=false;
      }else{
        this.overview=true;
      }
      console.log(this.overview);
    });
  }


  getloggedUser() {
    console.log('start');
    this.loggedUser$ = new Observable((observer) => {
      this.firestore
        .collection('users')
        .doc(this.loggedUserId)
        .valueChanges()
        .subscribe((user) => {
          console.log(user);
          this.loggedUser = new User(user);
          console.log(this.loggedUser);

          this.getChatpartner(), this.getMessages(),this.dateToString(),this.setChatpartnerEmail();

          observer.next();
          observer.complete();
        });

      observer.next();
      observer.complete();
    });
    this.loggedUser$.subscribe();
  }


  


  writeContact(contact) {
    this.messageTo = contact;
    this.overview = false;
    this.getNewChatpartner();
  }

  closeWrite() {
    this.overview = true;
    this.messageTo = '';
  }

  async getUsers() {
    await this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes) => {
        console.log(changes);
        this.users = changes;
        console.log(this.users);
      });
  }

  //filter users for current selected email;
  getNewChatpartner(){
    this.currentChatpartner=this.users.find((user)=>user.email===this.messageTo);
    console.log(this.messageTo)
    console.log(this.users)
    console.log(this.currentChatpartner)
  }

  setChatpartnerEmail(){
    if(this.currentChatpartner){
      this.messageTo=this.currentChatpartner;
    }
  }

  
  getMessages() {
    if(this.overview){
    this.allMessages = this.loggedUser.userMassages.filter((message) => {
      return message.chatpartner == this.currentChatpartner || message.author == this.currentChatpartner
    });
    console.log(this.allMessages);
  }}

  sortMessages(){
    this.allMessages[0]['messages'].sort((a, b) => a.date - b.date);
  }

  dateToString(){
    if(this.overview){
    for (let i=0;i<this.allMessages.length;i++){
      let timestamp = this.allMessages[i]['date'];
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        );

        // Erstellung eines Strings im gewünschten Format
        const dateString = date.toLocaleString('de-DE', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });
      this.allMessages[i]['datestring']=dateString;
    }}
  }

  async saveMessage() {
    let message= new Message();
    message.author=this.loggedUser.username;
    message.text=this.messagetext.message;
    message.date=this.dateToTimestamp();
    message.chatpartner=this.currentChatpartner.email;


    this.loggedUser.userMassages.push(message.toJSON())
    this.pushNewChatpartner(this.currentChatpartner.username)
    console.log(this.loggedUser.chatpartner)
    await this.firestore
    .collection('users')
    .doc(this.loggedUserId)
    .update(this.loggedUser.toJSON())
    .then((result) => {
      console.log(this.loggedUser.toJSON())
      console.log(result);
    });

  }

  dateToTimestamp() {
    const now = new Date();
    const seconds = Math.floor(now.getTime() / 1000);
    const nanoseconds = (now.getTime() % 1000) * 1000000;
    const timestamp = { seconds: seconds, nanoseconds: nanoseconds };
    return timestamp;
  }

  pushNewChatpartner(chatpartnerUsername){
    let index = this.loggedUser.chatpartner.findIndex((partner) => partner.username === chatpartnerUsername);
    if(index === -1){
      this.loggedUser.chatpartner.push(this.currentChatpartner.username);
      console.log("push");
    }
  }


  
  /*getAllMessagePartner() {
    this.firestore
      .collection('users')
      .doc('gn8iWQp4fDNXKy0hnwTk')
      .valueChanges()
      .subscribe((changes) => {
        console.log(changes);
      });
  }*/
}
