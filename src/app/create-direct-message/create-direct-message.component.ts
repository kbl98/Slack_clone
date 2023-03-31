import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-direct-message',
  templateUrl: './create-direct-message.component.html',
  styleUrls: ['./create-direct-message.component.scss']
})
export class CreateDirectMessageComponent {
constructor(private router:Router){}
messageTo;
overview=true;
//shows contacts, which have already chattet with oneself
showContacts(){

}

writeContact(contact){
this.messageTo=contact;
this.overview=false;
}

closeWrite(){
  this.overview=true;
  this.messageTo="";
}
}