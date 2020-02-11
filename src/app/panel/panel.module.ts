import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { UserListComponent } from './user-list/user-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [
    PanelComponent, 
    PanelHeaderComponent, 
    UserListComponent, 
    ServicesListComponent, 
    CategoryListComponent, 
    CategoryDetailComponent, 
    ServiceDetailComponent, UserDetailComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    FormsModule
  ]
})
export class PanelModule { }
