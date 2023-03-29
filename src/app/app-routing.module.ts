import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContentComponent } from './channel-content/channel-content.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:"main/:id",component:MainComponent, 
children: [
  
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
