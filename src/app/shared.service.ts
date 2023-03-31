import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public dialog: MatDialog) { }

 
  openLogIn() {
    this.dialog.open(DialogLoginComponent);
  }

}
