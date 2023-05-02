import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss'],
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
    private authServ: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' }) // durch das zufügen von "{idField: 'customIdName'}" kann man nun die Id vom User rauslesen
      .subscribe((changes: any) => {
        console.log('Änderungen', changes);
        this.allUsers = changes;
      });

    this.authServ.onAuthStateChanged((user) => {
      if (user) {
        // user is logged in
        console.log(user);
      } else {
        // user is not logged in
        this.router.navigateByUrl('/');
      }
    });
  }

  async logInUser() {
    let email = this.emailField.nativeElement.value;
    let password = this.passwordField.nativeElement.value;
  
    try {
      const userCredential = await this.authServ.signInWithEmailAndPassword(email, password);
      const user = userCredential.user; // Zugriff auf die user-Eigenschaft
      console.log(user.uid);
  
      // Weiterleitung zur Hauptseite mit der UID in der URL
      this.router.navigateByUrl(`/main/${user.uid}`);
      this.dialogRef.close();
  
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.wrongPassword = true;
        setTimeout(() => {
          this.wrongPassword = false;
        }, 500);
      }
    }
  }

  closeWindow() {
    this.dialogRef.close();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  guestLogIn() {
    this.router.navigateByUrl('main/:LnPQjmQyXbPgoinEk7CRv6NAjpK2');
    this.dialogRef.close();
  }

  loginAnimation() {
    let emailField = this.emailField.nativeElement;
    let passwordField = this.passwordField.nativeElement;
    // let loginButton = this.loginButton.nativeElement;
    if (!emailField.value || !passwordField.value) {
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
