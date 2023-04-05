import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContentComponent } from './channel-content/channel-content.component';
import { CreateDirectMessageComponent } from './create-direct-message/create-direct-message.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PolicyComponent } from './policy/policy.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'imprint', component: PolicyComponent },

  {
    path: "main/:id", component: MainComponent, canActivate: [AuthGuard],
    children: [{ path: 'main/:id/channel/:id2', component: ChannelContentComponent, canActivate: [AuthGuard], },
    { path: 'main/:id/userchat', component: CreateDirectMessageComponent, canActivate: [AuthGuard], },
    { path: 'main/:id/userchat/:chatpartner', component: CreateDirectMessageComponent, canActivate: [AuthGuard], }



    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
