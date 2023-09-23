import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //{ path: '', redirectTo : 'home',},
  //{ path: '/', redirectTo :'home' , },
  { path: '', component: HomeComponent, data: { breadcrumb: 'Dashboard' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
