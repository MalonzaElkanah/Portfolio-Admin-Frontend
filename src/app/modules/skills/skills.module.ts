import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillUpdateComponent } from './skill-update/skill-update.component';
import { SkillCreateComponent } from './skill-create/skill-create.component';


@NgModule({
  declarations: [
    SkillListComponent,
    SkillUpdateComponent,
    SkillCreateComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
