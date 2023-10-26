import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { AppComponent } from './app/app.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
