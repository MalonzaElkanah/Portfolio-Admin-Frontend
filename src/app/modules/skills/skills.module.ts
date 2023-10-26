import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillUpdateComponent } from './skill-update/skill-update.component';
import { SkillCreateComponent } from './skill-create/skill-create.component';
import { TechSkillsComponent } from './tech-skills/tech-skills.component';
import { ProfSkillsComponent } from './prof-skills/prof-skills.component';


@NgModule({
  declarations: [
    SkillListComponent,
    SkillUpdateComponent,
    SkillCreateComponent,
    TechSkillsComponent,
    ProfSkillsComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgSelectModule,
    ReactiveFormsModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
