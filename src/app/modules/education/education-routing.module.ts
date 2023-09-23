import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EducationUpdateComponent } from './education-update/education-update.component';
import { EducationCreateComponent } from './education-create/education-create.component';
import { EducationListComponent } from './education-list/education-list.component';

const routes: Routes = [
  { path: 'education', component: EducationListComponent },
  { path: 'education/update', component: EducationUpdateComponent },
  { path: 'education/create', component: EducationCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
