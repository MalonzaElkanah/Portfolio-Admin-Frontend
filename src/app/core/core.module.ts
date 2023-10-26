import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationModule } from './authentication/authentication.module';
import { ErrorsModule } from './errors/errors.module';
import { CoreRoutingModule } from './core-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    ErrorsModule,
    CoreRoutingModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LoaderComponent
  ]
})
export class CoreModule { }
