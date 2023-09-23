import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationUpdateComponent } from './education-update/education-update.component';
import { EducationCreateComponent } from './education-create/education-create.component';
import { EducationListComponent } from './education-list/education-list.component';


@NgModule({
  declarations: [
    EducationUpdateComponent,
    EducationCreateComponent,
    EducationListComponent
  ],
  imports: [
    CommonModule,
    EducationRoutingModule
  ]
})
export class EducationModule { }
