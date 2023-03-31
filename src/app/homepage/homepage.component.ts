import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateNewAccountComponent } from '../dialog-create-new-account/dialog-create-new-account.component';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  allUsers = [];

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'}) // durch das zufügen von "{idField: 'customIdName'}" kann man nun die Id vom User rauslesen
    .subscribe((changes: any) => {
      console.log('Änderungen', changes);
      this.allUsers = changes;
    });
  }

  constructor(public dialog: MatDialog, 
    private firestore: AngularFirestore,
    private sharedService: SharedService) {
    
  }

  public openLogInHomepage(): void{
    this.sharedService.openLogIn();
  }


  openRegistryWindow(){
    this.dialog.open(DialogCreateNewAccountComponent);
  }
  
}
