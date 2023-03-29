import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.getChannels();
  }
  channel = new Channel();
  channels = [];
  public open = true;

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
    } else {
      this.open = true;
    }
  }

  openDialogNewChannel(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  logout(){
    this.router.navigateByUrl('/');
  }
}
