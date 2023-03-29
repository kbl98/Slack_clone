import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss'],
})
export class ChannelContentComponent implements OnInit {
  channelId = '';
  channel = new Channel();
  threads = [
    {
      author: 'Hugo',
      text: 'Heute war ich in der Maxarena',
      date: '15.8.2022',
      authorPic: 'monkey.png',
    },
  ];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap) => {
      this.channelId = paraMap.get('id');
      this.getThreads();
    });
  }

  getThreads() {
    this.firestore
      .collection('channels')
      .doc('this.channelId')
      .valueChanges()
      .subscribe((channel) => {
        this.channel = new Channel(channel);
        //this.threads = this.channel.threads;
      });
  }
}
