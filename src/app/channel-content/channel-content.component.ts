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
  dateOfThreads;
  channelId = '';
  channel = new Channel();
  threads = [
    {
      author: 'Hugo',
      text: 'Heute war ich in der Maxarena',
      date: new Date().toDateString(),
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
      console.log(this.channelId);
      this.getThreads();
      this.getDate();
    });
  }

  getThreads() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel) => {
        console.log(channel)
        this.channel = new Channel(channel);
        this.threads = this.channel.threads;
        console.log(this.channel)
      });
  }

  getDate(){
    let date=new Date().getTime();
    for(let i=0;i<this.threads.length;i++){
      let datediff=date - new Date().getTime();//statt new Date () muss muss new Date(this.threads[i].date)
      if(datediff==0){
        this.dateOfThreads="heute";
      }else{
        this.dateOfThreads="vor" + datediff +"h"
      }
    }
  }
}


