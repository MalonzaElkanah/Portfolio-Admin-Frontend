import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "settings/app", component: AppComponent },
  { path: "settings/profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
