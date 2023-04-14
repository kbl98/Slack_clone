import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatMenuTrigger } from '@angular/material/menu';
import { DirectChat } from 'src/models/directChat.class';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

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

  ngOnInit() {
    this.getUsers();
    this.getloggedUser();
    this.routeSub = this.route.params.subscribe((params) => {
      this.getUsers();
      this.getloggedUser();
    });
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
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

  closeMenu() {
    this.trigger.closeMenu();
  }

  getUserId() {
    this.route.paramMap.subscribe((paraMap) => {
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

          this.getChatpartner(), this.getMessages(),this.dateToString();

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

  
  getMessages() {
    if(this.overview){
    this.allMessages = this.loggedUser.userMassages.filter((messages) => {
      return messages.author == this.currentChatpartner;
    });
    console.log(this.allMessages);
  }}

  sortMessages(){
    this.allMessages[0]['messages'].sort((a, b) => a.date - b.date);
  }

  dateToString(){
    if(this.overview){
    for (let i=0;i<this.allMessages[0]['messages'].length;i++){
      let datestring=new Date(this.allMessages[0]['messages'][i]['date']*1000);
      console.log(datestring);
      let dateAsString=datestring.toLocaleDateString("en-GB")+ ' '+datestring.toLocaleTimeString("it-IT")
      this.allMessages[0]['messages'][i]['datestring']=dateAsString;
    }}
  }

  saveMessage() {
    this.currentChatpartner = this.users[this.messageTo];
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
