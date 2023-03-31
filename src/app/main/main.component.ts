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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  template: ` <router-outlet></router-outlet>`,

  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  @ViewChildren(ChannelContentComponent)
  public viewedChannel: QueryList<ChannelContentComponent>;

  ngOnInit(): void {
    this.getChannels();
  }

  sideThread = true;
  channel = new Channel();
  channels = [];
  public open = true;
  public open2 = true;

  getChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes) => {
        console.log(changes);
        this.channels = changes;
      });
  }

  changeOpen() {
    if (this.open) {
      this.open = false;
      console.log(this.viewedChannel);
    } else {
      this.open = true;
    }
  }

  changeOpen2() {
    if (this.open2) {
      this.open2 = false;
      console.log(this.viewedChannel);
    } else {
      this.open2 = true;
    }
  }

  openDialogNewChannel(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.router.navigateByUrl('/');
  }


  openDialogNewChat(){
    
  }
}
