import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-create-channel',
  templateUrl: './dialog-create-channel.component.html',
  styleUrls: ['./dialog-create-channel.component.scss'],
})
export class DialogCreateChannelComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateChannelComponent>,
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router:Router
  ) {}

  loading = false;
  channelname: String;

  channel = new Channel();

  saveChannel() {
    console.log(this.channel);

    this.loading = true;
    this.channel.name = this.channelname;
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result) => {
        console.log(result);
        this.loading = false;
        this.dialogRef.close();
      });

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
