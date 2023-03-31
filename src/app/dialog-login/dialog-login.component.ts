import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<DialogLoginComponent>,
    private router: Router,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit(): void {}

  logInUser() {
    this.loading = true;
    // Überprüfen Sie, ob die Benutzerdaten in der Datenbank vorhanden sind
    this.firestore
      .collection('users', ref => ref.where('username', '==', this.username).where('password', '==', this.password))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        // Wenn der Benutzer gefunden wurde, navigieren Sie zur Hauptseite mit der ID des Benutzers als Parameter
        if (!querySnapshot.empty) {
          const user = querySnapshot.docs[0].data();
          this.router.navigateByUrl(`main/id`);
          this.dialogRef.close();
        } else {
          console.log('Benutzer nicht gefunden');
          alert('Benutzername oder Passwort ungültig.');
        }
        this.loading = false;
      });
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
}
