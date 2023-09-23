import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/view', component: ProjectViewComponent },
  { path: 'projects/add', component: ProjectAddComponent },
  { path: 'projects/edit', component: ProjectEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
