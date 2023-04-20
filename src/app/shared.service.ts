import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public dialog: MatDialog) { }

  private _darkmode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get sharedBoolean(): boolean {
    return this._darkmode.getValue();
  }

  set sharedBoolean(value: boolean) {
    this._darkmode.next(value);
  }
 
  openLogIn() {
    this.dialog.open(DialogLoginComponent);
  }

}
