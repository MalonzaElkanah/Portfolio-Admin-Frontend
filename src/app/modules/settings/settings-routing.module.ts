import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  { path: "settings/app", component: AppComponent },
  { path: "settings/email-server", component: EmailComponent },
  { path: "settings/change-password", component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
