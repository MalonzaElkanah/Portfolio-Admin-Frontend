import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkListComponent } from './work-list/work-list.component';
import { WorkCreateComponent } from './work-create/work-create.component';
import { WorkUpdateComponent } from './work-update/work-update.component';

import { workResolver } from './work.resolver';

const routes: Routes = [
  { path: '', component: WorkListComponent },
  { path: 'create', component: WorkCreateComponent },
  { path: 'update/:slug/:id', component: WorkUpdateComponent, resolve: { work: workResolver}  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
