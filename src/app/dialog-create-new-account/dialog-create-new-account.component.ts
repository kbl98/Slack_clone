import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-create-new-account',
  templateUrl: './dialog-create-new-account.component.html',
  styleUrls: ['./dialog-create-new-account.component.scss']
})
export class DialogCreateNewAccountComponent implements OnInit {
  
  

  user = new User();

  opened = false;
  password: string = '';
  showPassword: boolean = false;
  
  ngOnInit(): void {
    
  }

  constructor(public dialog: MatDialog, private firestore: AngularFirestore ,
    public dialogRef: MatDialogRef<DialogCreateNewAccountComponent>,
    private sharedService: SharedService) {
    
  }

  loading = false;


  closeWindow() {
    this.dialogRef.close();
  }

  createAccount() {
    console.log(this.user);
    this.loading = true;
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log(result);
        this.dialogRef.close();
      });
  }

  public openLogIn(): void {
    this.sharedService.openLogIn()
  }

  togglePassword() {
    this.showPassword = !this.showPassword; //wechsel zwischen true und false
  }
}
