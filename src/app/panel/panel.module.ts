import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [
    PanelComponent, 
    PanelHeaderComponent, UserListComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule
  ]
})
export class PanelModule { }
