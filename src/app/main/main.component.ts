import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  Input,
} from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChannelContentComponent } from '../channel-content/channel-content.component';
import { User } from 'src/models/user.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { KeyValuePipe } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { Comment } from 'src/models/comments.class';
import { Thread } from 'src/models/thread.class';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  template: ` <router-outlet></router-outlet>`,
  styleUrls: ['./main.component.scss'],
})


export class MainComponent implements OnInit {

  darkmode: boolean = false;
  @ViewChildren(ChannelContentComponent)
  public viewedChannel: QueryList<ChannelContentComponent>;

  sideThread = true;

  channel = new Channel();
  channels = [];
  filteredChannels: Channel[] = [];
  users: string[];

  public open = true;
  public open2 = true;
  loggedUserId;
  //loggedUserId = "gn8iWQp4fDNXKy0hnwTk";
  loggedUser = new User();
  openContent: string = "";

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AngularFireAuth,
    private sharedService: SharedService
  ) {
    this.channels = [];
    this.filteredChannels = this.channels.slice();
  }

  toggleDarkmode() {
    this.sharedService.sharedBoolean = !this.sharedService.sharedBoolean;
    this.darkmode = this.sharedService.sharedBoolean;
  }

  ngOnInit(): void {
    this.getChannels();
    this.getloggedUser();
  }


  getChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes) => {
        console.log('Channels :', changes);
        this.channels = changes;
      });
  }




  getUserId() {
    this.route.paramMap.subscribe((paraMap) => {
      this.loggedUserId = paraMap.get('id');
      console.log('Logged in User :', this.loggedUserId);
    })
  }


  changeOpen() {
    if (this.open) {
      this.open = false;
      console.log('Closed Channel Tree :', this.viewedChannel);
    } else {
      this.open = true;
    }
  }


  changeOpen2() {
    if (this.open2) {
      this.open2 = false;
      console.log('Closed Chat Tree :', this.viewedChannel);
    } else {
      this.open2 = true;
    }
    console.log('Logged in User :', this.loggedUser)
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
    this.getUserId();
    this.firestore
      .collection('users')
      .doc(this.loggedUserId)
      .valueChanges()
      .subscribe((user) => {
        console.log(user);
        this.loggedUser = new User(user);
        console.log('Logged in User :', this.loggedUser)
      });
  }

  getAllMessagePartner() {
    this.firestore.collection('users').doc(this.loggedUserId).valueChanges().subscribe((changes) => {
      console.log(changes);
    })
  }

  openDialogNewChat() { }


  openImprint() {
    this.router.navigateByUrl('main/:id/imprint');
  }


  openPolicy() {
    this.router.navigateByUrl('main/:id/policy');
  }


  changeOpenContent(clickedChannel: string) {
    this.openContent = clickedChannel;
  }

  filter(searchTerm: string) {
    this.filteredChannels = this.channels.filter(channel => {
      return channel.getComments().some(comment => comment.content.includes(searchTerm)) ||
        channel.getUsers().some(user => user.includes(searchTerm)) ||
        channel.getThread().some(thread => thread.title.includes(searchTerm));
    });
  }
}
