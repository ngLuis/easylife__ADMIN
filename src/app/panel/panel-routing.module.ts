import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { UserListComponent } from './user-list/user-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  {path: '', component: PanelComponent, children: [
    {path: 'usuarios', component: UserListComponent},
    {path: 'usuarios/:id', component: UserDetailComponent},
    {path: 'servicios', component: ServicesListComponent},
    {path: 'servicios/:id', component: ServiceDetailComponent},
    {path: 'categorias', component: CategoryListComponent},
    {path: 'categorias/:id', component: CategoryDetailComponent},
    {path: '', redirectTo: 'usuarios'}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PanelRoutingModule { }
