import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public dialog: MatDialog) { }

  private _sharedBoolean: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get sharedBoolean(): boolean {
    return this._sharedBoolean.getValue();
  }

  set sharedBoolean(value: boolean) {
    this._sharedBoolean.next(value);
  }
 
  openLogIn() {
    this.dialog.open(DialogLoginComponent);
  }

}
