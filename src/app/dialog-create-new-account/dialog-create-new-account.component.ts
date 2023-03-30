import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-new-account',
  templateUrl: './dialog-create-new-account.component.html',
  styleUrls: ['./dialog-create-new-account.component.scss']
})
export class DialogCreateNewAccountComponent implements OnInit {
  
  opened = false;
  password: string = '';
  showPassword: boolean = false;
  
  ngOnInit(): void {
   
  }

  constructor(public dialog: MatDialog, private firestore: AngularFirestore ,public dialogRef: MatDialogRef<DialogCreateNewAccountComponent>) {
    
  }

  loading = false;


  closeWindow() {
    this.dialogRef.close();
  }

  createAccount() {

  }

  openLogIn() {

  }

  togglePassword() {
    this.showPassword = !this.showPassword; //wechsel zwischen true und false
  }
}
