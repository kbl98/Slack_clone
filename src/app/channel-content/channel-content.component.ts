import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { ActivatedRoute, OutletContext } from '@angular/router';
import { TextBoxComponent } from '../text-box/text-box.component';

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

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap) => {
      this.channelId = paraMap.get('id');
      console.log(this.channelId);
      this.getThreads();
      this.getDate();
    });
  }

  async getThreads() {
    await this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel) => {
        console.log(channel);
        this.channel = new Channel(channel);
        this.threads = this.channel.threads;
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

  getDate() {
    let date = new Date().getTime();

    for (let i = 0; i < this.threads.length; i++) {
      let thread_date = new Date(this.threads[i]['date']);
      console.log(this.threads[i]['date']);
      let datediff = date - date; //statt new Date () muss muss new Date(this.threads[i].date)
      if (datediff == 0) {
        this.dateOfThreads = 'heute';
      } else {
        this.dateOfThreads = 'vor' + datediff + 'h';
      }
    }
  }
}
