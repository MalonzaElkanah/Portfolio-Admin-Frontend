import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
/** App Interceptor */
import { Interceptor } from './interceptors/interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  providers : [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ]
})
export class SharedModule { }
