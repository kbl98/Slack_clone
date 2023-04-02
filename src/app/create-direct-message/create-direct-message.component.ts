import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-create-direct-message',
  templateUrl: './create-direct-message.component.html',
  styleUrls: ['./create-direct-message.component.scss']
})
export class CreateDirectMessageComponent implements OnInit{
constructor(private router:Router, private firestore: AngularFirestore){}

ngOnInit(){
this.getUsers();
}

@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
disabledTrigger=false;
messageTo;
overview=true;
userEmails=[];
users=[];
currentChatpartner=new User;


closeMenu(){
  this.trigger.closeMenu()
 
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


saveMessage(){
  this.currentChatpartner=this.users[this.messageTo];
  
}

}