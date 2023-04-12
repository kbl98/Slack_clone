import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChannelContentComponent } from '../channel-content/channel-content.component';
import { User } from 'src/models/user.class';
<<<<<<< HEAD
import { KeyValuePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
=======
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { KeyValuePipe } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
>>>>>>> d9d825821842ee0d1c361287e3d6c0f785781d76


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  template: ` <router-outlet></router-outlet>`,

  styleUrls: ['./main.component.scss'],
})


export class MainComponent implements OnInit {


  @ViewChildren(ChannelContentComponent)
  public viewedChannel: QueryList<ChannelContentComponent>;

  sideThread = true;

  channel = new Channel();
  channels = [];

  public open = true;
  public open2 = true;

  loggedUserId = "gn8iWQp4fDNXKy0hnwTk";
  loggedUser = new User();

  openContent: string = "";


  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AngularFireAuth
  ) { }
<<<<<<< HEAD
  @ViewChildren(ChannelContentComponent)
  public viewedChannel: QueryList<ChannelContentComponent>;
=======

>>>>>>> d9d825821842ee0d1c361287e3d6c0f785781d76

  ngOnInit(): void {
    this.getChannels();
    this.getloggedUser();
  }


  getChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes) => {
        console.log('Channels :',changes);
        this.channels = changes;
      });
  }


  getUserId() {
    this.route.paramMap.subscribe((paraMap) => {
      this.loggedUserId = paraMap.get('id');
      console.log('Logged in User :',this.loggedUserId);
    })
  }


  changeOpen() {
    if (this.open) {
      this.open = false;
      console.log('Closed Channel Tree :',this.viewedChannel);
    } else {
      this.open = true;
    }
  }


  changeOpen2() {
    if (this.open2) {
      this.open2 = false;
      console.log('Closed Chat Tree :',this.viewedChannel);
    } else {
      this.open2 = true;
    }
    console.log('Logged in User :',this.loggedUser)
  }


  openDialogNewChannel(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  logout() {
    this.authServ.signOut().then(() => this.router.navigateByUrl('/'))
      .catch((error) => console.info(error));
    // this.router.navigateByUrl('/');
  }


  getloggedUser() {
    //this.getUserId();
    this.firestore
      .collection('users')
      .doc(this.loggedUserId)
      .valueChanges()
      .subscribe((user) => {
        console.log(user);
        this.loggedUser = new User(user);
        console.log('Logged in User :',this.loggedUser)
      });
  }

  /*getAllMessagePartner(){
    this.firestore.collection('users').doc('gn8iWQp4fDNXKy0hnwTk').valueChanges().subscribe((changes) => {
      console.log(changes);})}*/

  openDialogNewChat() {}


  openImprint() {
    this.router.navigateByUrl('main/:id/imprint');
  }


  openPolicy() {
    this.router.navigateByUrl('main/:id/policy');
  }


  changeOpenContent(clickedChannel: string) {
    this.openContent = clickedChannel;
  }
}
