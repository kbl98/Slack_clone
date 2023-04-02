import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { ActivatedRoute, OutletContext } from '@angular/router';
import { TextBoxComponent } from '../text-box/text-box.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss'],
})
export class ChannelContentComponent implements OnInit {
  @ViewChild('channeltext') channeltext: TextBoxComponent;
  sideThread = true;
  activThreadId;
  activThread;
  openSide = false;
  dateOfThreads;
  channelId = '';
  channel = new Channel();
  emitId;
  threads = [new Thread()];
  channel$;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.channel$ = new Observable((observer) => {
      this.route.paramMap.subscribe((paraMap) => {
        this.channelId = paraMap.get('id');
        console.log(this.channelId);
        this.getThreads();
        observer.next(this.getDate());
        observer.complete();
      });
    });

    this.channel$.subscribe();
  }

  async getAllThreads() {
    await this.getThreads();
    this.getDate();
  }

  /*channel$ = Observable.create((observer) => {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel) => {
        console.log(channel);
        this.channel = new Channel(channel);
        this.threads = this.channel.threads;
        console.log(this.threads[0]['date']);
        observer.next(channel);
      });
  });*/

  async getThreads() {
    await this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel) => {
        console.log(channel);
        this.channel = new Channel(channel);
        this.threads = this.channel.threads;
        console.log(this.threads[0]['date']);
      });
  }

  open(i) {
    if (this.threads[i]['comments']) {
      this.activThreadId = i;
      this.openSide = true;
      console.log(this.threads[0]);
    }
  }

  getAnswers(i) {
    this.activThread = this.threads[i];
  }

  async getDate() {
    let date = new Date().getTime() / 1000;
    console.log(this.threads[0]['date']['seconds']);
    for (let i = 0; i < this.threads.length; i++) {
      let datediff = +date - this.threads[i]['date']['seconds']; //statt new Date () muss muss new Date(this.threads[i].date)
      datediff = Math.floor(datediff / 86400);
      console.log(date);
      console.log(datediff);
      if (datediff == 0) {
        this.dateOfThreads = 'heute';
      } else {
        this.dateOfThreads = 'vor' + datediff + 'Tagen';
      }
    }
  }
}
