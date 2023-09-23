import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkListComponent } from './work-list/work-list.component';
import { WorkCreateComponent } from './work-create/work-create.component';
import { WorkUpdateComponent } from './work-update/work-update.component';

const routes: Routes = [
  { path: 'work', component: WorkListComponent },
  { path: 'work/create', component: WorkCreateComponent },
  { path: 'work/update', component: WorkUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
