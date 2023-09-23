import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkCreateComponent } from './work-create/work-create.component';
import { WorkUpdateComponent } from './work-update/work-update.component';


@NgModule({
  declarations: [
    WorkListComponent,
    WorkCreateComponent,
    WorkUpdateComponent
  ],
  imports: [
    CommonModule,
    WorkRoutingModule
  ]
})
export class WorkModule { }
