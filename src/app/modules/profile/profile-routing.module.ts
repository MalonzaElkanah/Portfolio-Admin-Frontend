import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

import { profileResolver } from './profile.resolver';

const routes: Routes = [
  /*{
    path:  '',
    component:  ProfileViewComponent,
    children: [
      {
        path:  'edit',
        component: ProfileEditComponent
      }
    ]
  }*/

  { path: 'edit', component: ProfileEditComponent, resolve: { profile: profileResolver} },
  { path: '', component: ProfileViewComponent, resolve: { profile: profileResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
