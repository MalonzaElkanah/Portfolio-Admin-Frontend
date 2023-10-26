import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PriceCreateComponent } from './price-create/price-create.component';
import { PriceUpdateComponent } from './price-update/price-update.component';
import { PriceListComponent } from './price-list/price-list.component';

import { pricesResolver } from './prices.resolver';

const routes: Routes = [
  { path: "", component: PriceListComponent },
  { path: "create", component: PriceCreateComponent },
  { path: "update/:slug/:id", component: PriceUpdateComponent, resolve: { pricing: pricesResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricesRoutingModule { }
