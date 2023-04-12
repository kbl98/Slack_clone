import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { User } from 'src/models/user.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  email: string = '';
  
  ngOnInit(): void {
    
  }

  constructor(public dialog: MatDialog, private firestore: AngularFirestore ,
    public dialogRef: MatDialogRef<DialogCreateNewAccountComponent>,
    private sharedService: SharedService, private authServ: AngularFireAuth) {
    
  }

  loading = false;


  closeWindow() {
    this.dialogRef.close();
  }
  
  createAccount() {
    // Überprüfe, ob alle Felder ausgefüllt sind
    if (!this.user.username || !this.user.email || !this.password) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }
  
    // Erstelle den Account
    this.authServ.createUserWithEmailAndPassword(this.user.email, this.password)
    .then(userCred =>{ 
      this.firestore
      .collection('users')
      .doc(userCred.user.uid)
      .set(this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log(result);
        this.dialogRef.close();        
      });
    }).catch(err => console.log(err));
  }

  public openLogIn(): void {
    this.sharedService.openLogIn()
  }

  togglePassword() {
    this.showPassword = !this.showPassword; //wechsel zwischen true und false
  }
}

