import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path: '', component: PanelComponent, children: [
    {path: 'usuarios', component: UserListComponent},
    {path: '', redirectTo: 'usuarios'}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PanelRoutingModule { }
