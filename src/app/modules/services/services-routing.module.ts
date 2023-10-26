import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceUpdateComponent } from './service-update/service-update.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceListComponent } from './service-list/service-list.component';

import { servicesResolver } from './services.resolver'

const routes: Routes = [
  { path: "", component: ServiceListComponent },
  { path: "update/:slug/:id", component: ServiceUpdateComponent, resolve: { service: servicesResolver } },
  { path: "add", component: ServiceCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
