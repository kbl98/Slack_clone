import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
  })
  export class DialogLoginComponent implements OnInit {
  
  loading = false;

  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  error: string = '';
  
  constructor(private router: Router,
  public dialog: MatDialog,
  private userService: UserService,
  public dialogRef: MatDialogRef<DialogLoginComponent>,
  private sharedService: SharedService) {
  
  }
  
  ngOnInit(): void {
  
  }
  
  logInUser() {
  this.userService.loginUser(this.username, this.password).subscribe(
  success => {
  if (success) {
  // Benutzer authentifiziert
  this.router.navigateByUrl('main/:id');
  this.dialogRef.close();
  } else {
  // Benutzer nicht authentifiziert
  this.error = 'Falscher Benutzername oder Passwort.';
  }
  },
  error => {
  console.log(error);
  this.error = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
  }
  );
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