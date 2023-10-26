import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
/** App Interceptor */
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  providers : [httpInterceptorProviders]
})
export class SharedModule { }
