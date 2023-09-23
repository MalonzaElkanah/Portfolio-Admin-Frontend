import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';

import { ModulesRoutingModule } from './modules-routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { BlogModule } from './blog/blog.module';
import { EducationModule } from './education/education.module';
import { MessagesModule } from './messages/messages.module';
import { PricesModule } from './prices/prices.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { ServicesModule } from './services/services.module';
import { SettingsModule } from './settings/settings.module';
import { SkillsModule } from './skills/skills.module';
import { WorkModule } from './work/work.module';

// import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    // ProfileComponent
  ],
  imports: [
    DataTablesModule,
    CommonModule,
    DashboardModule,
    BlogModule,
    EducationModule,
    MessagesModule,
    PricesModule,
    ProfileModule,
    ProjectModule,
    ServicesModule,
    SettingsModule,
    SkillsModule,
    WorkModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule { }
