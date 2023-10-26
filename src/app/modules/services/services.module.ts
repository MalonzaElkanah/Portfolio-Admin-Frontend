import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceUpdateComponent } from './service-update/service-update.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceListComponent } from './service-list/service-list.component';


@NgModule({
  declarations: [
    ServiceUpdateComponent,
    ServiceCreateComponent,
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
