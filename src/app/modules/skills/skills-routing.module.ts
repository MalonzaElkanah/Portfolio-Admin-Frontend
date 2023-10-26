import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillUpdateComponent } from './skill-update/skill-update.component';
import { SkillCreateComponent } from './skill-create/skill-create.component';

import { skillsResolver } from './skills.resolver';

const routes: Routes = [
  { path: "", component: SkillListComponent },
  { path: "update/:slug/:id", component: SkillUpdateComponent, resolve: {skill: skillsResolver} },
  { path: "create", component: SkillCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
