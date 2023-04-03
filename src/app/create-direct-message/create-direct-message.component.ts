import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatMenuTrigger } from '@angular/material/menu';
import { DirectChat } from 'src/models/directChat.class';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-create-direct-message',
  templateUrl: './create-direct-message.component.html',
  styleUrls: ['./create-direct-message.component.scss']
})
export class CreateDirectMessageComponent implements OnInit{
constructor(private router:Router, private firestore: AngularFirestore, private route: ActivatedRoute){}

ngOnInit(){
this.getUsers();
this.getloggedUser();
//this.getChatpartner();
//this.getAllMessagePartner();
//this.getMessages();
}

@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
disabledTrigger=false;
messageTo;
overview=true;
userEmails=[];
users=[];
currentChatpartner;
loggedUser;
loggedUserId="gn8iWQp4fDNXKy0hnwTk"
allMessages;
loggedUser$;


closeMenu(){
  this.trigger.closeMenu()
 
}

getUserId(){
  this.route.paramMap.subscribe((paraMap) => {
    this.loggedUserId = paraMap.get('id');
    console.log(this.loggedUserId);
})}

getChatpartner(){
  this.route.paramMap.subscribe((paraMap) => {
    this.currentChatpartner = paraMap.get('chatpartner');
    console.log(this.currentChatpartner);
   
})
}



/*getloggedUser(){
  //this.getUserId();
  this.firestore
  .collection('users')
  .doc(this.loggedUserId)
  .valueChanges()
  .subscribe((user) => {
    console.log(user);
    this.loggedUser = new User(user);
    console.log(this.loggedUser)
  });
}*/

getloggedUser(){
  console.log("start");
  this.loggedUser$ = new Observable((observer) => {
  this.firestore
  .collection('users')
  .doc(this.loggedUserId)
  .valueChanges()
  .subscribe((user) => {
    console.log(user);
    this.loggedUser = new User(user);
    console.log(this.loggedUser)
 
 
    
      this.getChatpartner(),
      this.getMessages()
   
      observer.next();
      observer.complete();
    });
 
    observer.next()
    observer.complete();
  
})
  this.loggedUser$.subscribe();
}

writeContact(contact){
this.messageTo=contact;
this.overview=false;
}

closeWrite(){
  this.overview=true;
  this.messageTo="";
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
    /*for(let user of this.users){
      user=new User(user);
      this.users[user]=user;
    }*/

}

getMessages(){
  console.log(this.loggedUser.userMessages)
this.allMessages=this.loggedUser.userMessages.filter((messages)=>{
  return messages.author==this.currentChatpartner
})
console.log(this.allMessages)
}


saveMessage(){
  this.currentChatpartner=this.users[this.messageTo];
  
}

getAllMessagePartner(){
  this.firestore.collection('users').doc('gn8iWQp4fDNXKy0hnwTk').valueChanges().subscribe((changes) => {
    console.log(changes);})}
}

