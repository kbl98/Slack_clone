import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { ActivatedRoute, OutletContext } from '@angular/router';
import { TextBoxComponent } from '../text-box/text-box.component';
import { of } from 'rxjs';
import { startWith } from 'rxjs/operators';
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
  topBoarder=false;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.channel$ = new Observable((observer) => {
      this.route.paramMap.subscribe((paraMap) => {
        this.channelId = paraMap.get('id2');
        console.log(this.channelId);
        this.getThreads();
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
        console.log(channel);
        this.channel = new Channel(channel);
        this.threads = this.channel.threads;
        console.log(this.threads[0]['date']);
        this.dateToString()
        this.getDate();
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
    this.threads.sort((a, b) => a.date - b.date);
    this.compareDates(date);
  }

  compareDates(date){
    for (let i = 0; i < this.threads.length; i++) {
      let diffTemp;
      let datediff = +date - this.threads[i]['date']['seconds']; //statt new Date () muss muss new Date(this.threads[i].date)
      datediff = Math.floor(datediff / 86400);
     if(!(diffTemp==datediff)){
      diffTemp=datediff;
      this.topBoarder=true;
      if (datediff == 0) {
        this.threads[i]['dateOfThread'] = 'heute';
      } else {
        this.threads[i]['dateOfThread'] = 'vor ' + datediff + ' Tagen';
    }
    }else{
      this.topBoarder=false;
    }
    }
  }

  dateToString(){
    for (let i=0;i<this.threads.length;i++){
      let datestring=new Date(this.threads[i]['date']*1000);
      console.log(datestring);
      let dateAsString=datestring.toLocaleDateString("en-GB")+ ' '+datestring.toLocaleTimeString("it-IT")
      this.threads[i]['datestring']=dateAsString;
    }
  }

 

  
}
