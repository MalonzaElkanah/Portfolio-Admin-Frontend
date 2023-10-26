import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EducationUpdateComponent } from './education-update/education-update.component';
import { EducationCreateComponent } from './education-create/education-create.component';
import { EducationListComponent } from './education-list/education-list.component';

import { educationResolver } from './education.resolver';

const routes: Routes = [
  { path: '', component: EducationListComponent },
  { path: 'update/:slug/:id', component: EducationUpdateComponent, resolve: { education: educationResolver } },
  { path: 'create', component: EducationCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
