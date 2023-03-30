import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {
  
  opened = false;
  password: string = '';
  showPassword: boolean = false;
  
  ngOnInit(): void {
   
  }

  constructor(private router: Router, 
    public dialog: MatDialog, 
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    private sharedService: SharedService) {
    
  }

  loading = false;

  logInUser() {
    
  }

  closeWindow() {
    this.dialogRef.close();
  }

  togglePassword() {
    this.showPassword = !this.showPassword; //wechsel zwischen true und false
  }

  guestLogIn() {
    this.router.navigateByUrl('main/:id');
    this.dialogRef.close();
  }  
}
