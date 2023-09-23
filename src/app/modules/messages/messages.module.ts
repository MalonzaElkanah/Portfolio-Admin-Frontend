import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message-list/message-list.component';


@NgModule({
  declarations: [
    MessageComponent,
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
