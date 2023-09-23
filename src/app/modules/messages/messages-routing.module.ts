import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageListComponent } from './message-list/message-list.component';

const routes: Routes = [
  { path: '', component: MessageListComponent, data: { breadcrumb: 'Messages' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
