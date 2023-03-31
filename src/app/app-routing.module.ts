import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContentComponent } from './channel-content/channel-content.component';
import { CreateDirectMessageComponent } from './create-direct-message/create-direct-message.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path:'',component:HomepageComponent},
 
  {path:"main/:id",component:MainComponent, 
children: [{path:'main/:id/channel/:id',component:ChannelContentComponent},
          {path:'main/:id/userchat',component:CreateDirectMessageComponent}
        
      
          
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
