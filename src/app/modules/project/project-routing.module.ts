import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';

import { projectResolver } from './project.resolver';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'view/:slug/:id', component: ProjectViewComponent, resolve: { project: projectResolver} },
  { path: 'add', component: ProjectAddComponent },
  { path: 'edit/:slug/:id', component: ProjectEditComponent, resolve: { project: projectResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
