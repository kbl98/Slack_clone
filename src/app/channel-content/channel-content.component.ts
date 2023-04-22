import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { ActivatedRoute, OutletContext } from '@angular/router';
import { TextBoxComponent } from '../text-box/text-box.component';
import { of } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { Comment } from 'src/models/comments.class';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss'],
})
export class ChannelContentComponent implements OnInit {
  @ViewChild(TextBoxComponent) editorText: TextBoxComponent;
  @ViewChild('commenttext') commenttext!: TextBoxComponent;

  sideThread = true;
  activThreadId;
  activThread;
  openSide = false;
  dateOfThreads;
  channelId = '';
  channel = new Channel();
  emitId;
  threads = [];
  channel$;
  topBoarder = [];
  loggedUser=new User();
  loggedUserId;
  loggedUser$;
  darkmode: boolean = false;
  channels: Channel[];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) {
    setInterval(() => {
      this.darkmode = this.sharedService.sharedBoolean;
    }, 1000 / 30)
  }

y() {
    console.log('Funktion in der');
  }

  async ngOnInit() {
    this.channel$ = new Observable((observer) => {
      this.route.paramMap.subscribe((paraMap) => {
        this.channelId = paraMap.get('id2');
        this.getThreads();
        this.getloggedUser();
        //observer.next(this.getDate());
        observer.complete();
      });
    });

    this.channel$.subscribe();
    console.log(this.channelId)
  }

  async getAllThreads() {
    await this.getThreads();
    this.getDate();
  }

  async getThreads() {
    await this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel) => {
        this.channel = new Channel(channel);
        this.threads = this.channel.threads;
        this.dateToString();
        this.getDate();
      });
  }

  getUserId() {
    this.route.parent.paramMap.subscribe((paraMap) => {
      this.loggedUserId = paraMap.get('id');
    });
  }

  /*getloggedUser() {
    this.getUserId();
    this.loggedUser$ = new Observable((observer) => {
      this.firestore
        .collection('users')
        //.doc(this.loggedUserId)
        .valueChanges()
        .subscribe((user) => {
          this.loggedUser = new User(user);
          console.log(user);
          //observer.next();
          //observer.complete();
        });
      observer.next();
      observer.complete();
    });
    this.loggedUser$.subscribe();
    console.log(this.loggedUser)
  }*/

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
      })};
  

  open(i) {
    // if (this.threads[i]['comments']) {
    this.activThreadId = i;
    this.openSide = true;
    //}
  }

  deleteThread(i) {
    this.threads.splice(i, 1);
    this.pushThread();
  }

  authorIsLoggedUser(i, thread) {
    if (thread[i].author == this.loggedUser.username) {
      return true;
    } else {
      return false;
    }
  }

  deleteComment(i) {
    this.threads[this.activThreadId]['comments'].splice(i);
    this.pushThread();
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  getAnswers(i) {
    this.activThread = this.threads[i];
  }

  async getDate() {
    if (this.threads.length > 0) {
      let date = this.dateToTimestamp();
      this.threads.sort((a, b) => a.date['seconds'] - b.date['seconds']);
      this.compareDates(date);
    }
  }

  compareDates(date) {
    if (this.threads.length > 1) {
      for (let i = 0; i < this.threads.length; i++) {
        let diffTemp;
        let datediff = +date['seconds'] - this.threads[i]['date']['seconds'];
        datediff = Math.floor(datediff / 86400);
        //if (!(diffTemp == datediff)) {
        if (datediff == 0 && this.isDateChanged(i)) {
          this.threads[i]['dateOfThread'] = 'heute';
        } else if (this.isDateChanged(i)) {
          this.threads[i]['dateOfThread'] = 'vor ' + datediff + ' Tagen';
        }
        // }
      }
    }
  }

  isDateChanged(index: number): boolean {
    if (index === 0) {
      // Zeige das Datum für den ersten Thread immer an
      return true;
    }
    const currentThread = this.threads[index];
    const previousThread = this.threads[index - 1];
    return currentThread.dateOfThread !== previousThread.dateOfThread;
  }

  dateToString() {
    if (this.threads.length > 0) {
      for (let i = 0; i < this.threads.length; i++) {
        //let timestamp = this.threads[i]['date'];
        //const date = new Date(
        // timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        //);
        //const dateString = date.toLocaleString('de-DE', {
        //  day: 'numeric',
        // month: 'numeric',
        // year: 'numeric',
        //hour: 'numeric',
        // minute: 'numeric',
        // hour12: false,
        //});
        //this.threads[i]['datestring'] = dateString;
        this.threads[i]['datestring'] = this.commentdateToString(
          this.threads[i]
        );
      }
    }
  }

  commentdateToString(comment) {
    let timestamp = comment['date'];
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
    return dateString;
  }

  async saveMessageToChannel() {
    let thread = new Thread();
    thread.author = this.loggedUser.username;
    thread.date = this.dateToTimestamp();
    thread.text = this.editorText.message;
    thread.authorPic = this.loggedUser.userpicture;
    this.threads.push(thread.threadToJSON());
    this.pushThread();
    //this.channel.threads = this.threads;
    //await this.firestore
    // .collection('channels')
    // .doc(this.channelId)
    // .update(this.channel.toJSON())
    // .then((result) => {
    //  console.log(result);
    //});
    this.scrollToBottom('.allThreads');
  }

  async saveMessageToThread() {
    let comment = new Comment();
    comment.author = this.loggedUser.username;
    //comment.date=this.dateToTimestamp; ---
    comment.comment = this.commenttext.message;
    comment.date = this.dateToTimestamp();
    this.threads[this.activThreadId].comments.push(comment.commentToJSON());

    this.pushThread();

    //this.channel.threads = this.threads;
    //await this.firestore
    // .collection('channels')
    // .doc(this.channelId)
    // .update(this.channel.toJSON())
    //.then((result) => {
    //  console.log(result);
    // });
    this.scrollToBottom('.open-thread-comments');
  }

  async pushThread() {
    this.channel.threads = this.threads;
    console.log(this.channelId);
    console.log(this.channel)
    await this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
      .then((result) => {
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

  scrollToBottom(x) {
    let container = document.querySelector(x);
    container.scrollTop = container.scrollHeight;
  }

  getChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes) => {
        console.log('Channels :',changes);
        this.channels = changes.map((channel) => new Channel(channel)); // hier wird für jeden Channel eine Instanz der "Channel"-Klasse erstellt
      });
  }
}
