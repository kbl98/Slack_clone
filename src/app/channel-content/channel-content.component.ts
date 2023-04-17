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
  loggedUser;
  loggedUserId;
  loggedUser$;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  handleMyEvent() {
    console.log('Funktion in der Parent-Komponente ausgeführt');
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

  getloggedUser() {
    this.getUserId();
    this.loggedUser$ = new Observable((observer) => {
      this.firestore
        .collection('users')
        .doc(this.loggedUserId)
        .valueChanges()
        .subscribe((user) => {
          this.loggedUser = new User(user);
          observer.next();
          observer.complete();
        });
      observer.next();
      observer.complete();
    });
    this.loggedUser$.subscribe();
  }

  open(i) {
    // if (this.threads[i]['comments']) {
    this.activThreadId = i;
    this.openSide = true;
    //}
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
        let timestamp = this.threads[i]['date'];
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
        this.threads[i]['datestring'] = dateString;
      }
    }
  }

  commentdateToString(comment){
    let timestamp = comment['date'];
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
        return dateString;
  }

  async saveMessageToChannel() {
    let thread = new Thread();
    thread.author = this.loggedUser.username;
    thread.date = this.dateToTimestamp();
    thread.text = this.editorText.message;
    this.editorText.clear();
    thread.authorPic = this.loggedUser.userpicture;
    this.threads.push(thread.threadToJSON());
    this.channel.threads = this.threads;
    await this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
      .then((result) => {
        console.log(result);
      });
    this.scrollToBottom();
  }

  async saveMessageToThread() {
    let comment = new Comment();
    comment.author = this.loggedUser.username;
    //comment.date=this.dateToTimestamp;
    comment.comment = this.commenttext.message;
    comment.date=this.dateToTimestamp();
    this.threads[this.activThreadId].comments.push(comment.commentToJSON());
    this.channel.threads = this.threads;
    await this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
      .then((result) => {
        console.log(result);
      });
    //  this.scrollToBottom();
  }

  dateToTimestamp() {
    const now = new Date();
    const seconds = Math.floor(now.getTime() / 1000);
    const nanoseconds = (now.getTime() % 1000) * 1000000;
    const timestamp = { seconds: seconds, nanoseconds: nanoseconds };
    return timestamp;
  }

  scrollToBottom() {
    let container = document.querySelector('.allThreads');
    container.scrollTop = container.scrollHeight;
  }
}
