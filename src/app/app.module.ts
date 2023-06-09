import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ChannelContentComponent } from './channel-content/channel-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from './dialog-create-channel/dialog-create-channel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MainComponent } from './main/main.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogCreateNewAccountComponent } from './dialog-create-new-account/dialog-create-new-account.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { QuillModule } from 'ngx-quill';
import { UserComponent } from './user/user.component';
import { CreateDirectMessageComponent } from './create-direct-message/create-direct-message.component';
import { KeyValue, KeyValuePipe } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ImprintComponent } from './imprint/imprint.component';
import { PolicyComponent } from './policy/policy.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';





@NgModule({
  declarations: [
    AppComponent,
    ChannelContentComponent,
    DialogCreateChannelComponent,
    MainComponent,
    HomepageComponent,
    DialogLoginComponent,
    DialogCreateNewAccountComponent,
    TextBoxComponent,
    UserComponent,
    CreateDirectMessageComponent,
    ImprintComponent,
    PolicyComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    QuillModule.forRoot(),
    KeyValuePipe,
    MatSlideToggleModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
