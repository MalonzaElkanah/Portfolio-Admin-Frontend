import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxSummernoteModule } from 'ngx-summernote';


import { ProjectRoutingModule } from './project-routing.module';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';


@NgModule({
  declarations: [
    ProjectEditComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgxSummernoteModule,
    NgSelectModule,
    ReactiveFormsModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
