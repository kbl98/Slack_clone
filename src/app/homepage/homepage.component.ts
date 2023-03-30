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
  ngOnInit(): void {
    
  }

  constructor(public dialog: MatDialog, 
    private firestore: AngularFirestore,
    private sharedService: SharedService) {
    
  }

  openLogIn(){
    this.dialog.open(DialogLoginComponent);
  }


  openRegistryWindow(){
    this.dialog.open(DialogCreateNewAccountComponent);
  }
  
}
