import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillUpdateComponent } from './skill-update/skill-update.component';
import { SkillCreateComponent } from './skill-create/skill-create.component';

const routes: Routes = [
  { path: "skills", component: SkillListComponent },
  { path: "skills/update", component: SkillUpdateComponent },
  { path: "skills/create", component: SkillCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
