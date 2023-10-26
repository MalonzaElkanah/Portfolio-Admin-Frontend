import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PricesRoutingModule } from './prices-routing.module';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceUpdateComponent } from './price-update/price-update.component';
import { PriceCreateComponent } from './price-create/price-create.component';


@NgModule({
  declarations: [
    PriceListComponent,
    PriceUpdateComponent,
    PriceCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PricesRoutingModule
  ]
})
export class PricesModule { }
