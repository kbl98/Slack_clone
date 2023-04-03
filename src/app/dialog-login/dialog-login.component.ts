import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  allUsers = [];

  logedin = true;
  wrongPassword = false;

  @ViewChild('emailField') emailField: ElementRef;
  @ViewChild('passwordField') passwordField: ElementRef;
  @ViewChild('usernameField') usernameField: ElementRef;
  @ViewChild('loginButton') loginButton: ElementRef;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<DialogLoginComponent>,
    private router: Router,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'}) // durch das zufügen von "{idField: 'customIdName'}" kann man nun die Id vom User rauslesen
    .subscribe((changes: any) => {
      console.log('Änderungen', changes);
      this.allUsers = changes;
    });
  }

  async logInUser() {
    let username = this.usernameField.nativeElement.value;
    let password = this.passwordField.nativeElement.value;
  
    try {
      // Abfrage an Firebase
      let querySnapshot = await this.firestore
        .collection('users', ref => ref.where('username', '==', username).where('password', '==', password))
        .get()
        .toPromise();
  
      if (!querySnapshot.empty) {
        // Wenn Benutzer gefunden, dann Weiterleitung zur Hauptseite
        let user = querySnapshot.docs[0].data();
        this.router.navigateByUrl('main/:id');
        this.dialogRef.close();
      } else {
        this.wrongPassword = true;
        setTimeout(() => {
          this.wrongPassword = false;
        }, 2000);
      }
    } catch (error) {
      // Wenn es einen Fehler gibt, dann in der Konsole ausgeben
      console.log(error);
    }
  }

  

  closeWindow() {
    this.dialogRef.close();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  guestLogIn() {
    this.router.navigateByUrl('main/:id');
    this.dialogRef.close();
  }  

  loginAnimation() {
    let usernameField = this.usernameField.nativeElement;
    let passwordField = this.passwordField.nativeElement;
    let loginButton = this.loginButton.nativeElement;
    if (!usernameField.value || !passwordField.value ) {
      this.logedin = false; 
      setTimeout(() => {
        this.logedin = true;
      }, 500);
    } else {
      // Wenn die Felder ausgefüllt sind, führen Sie die Login-Logik aus
      this.logInUser();
    }
  }
}
