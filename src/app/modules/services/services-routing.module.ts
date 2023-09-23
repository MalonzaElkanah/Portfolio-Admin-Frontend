import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceUpdateComponent } from './service-update/service-update.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  { path: "services", component: ServiceListComponent },
  { path: "services/update", component: ServiceUpdateComponent },
  { path: "services/add", component: ServiceCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
