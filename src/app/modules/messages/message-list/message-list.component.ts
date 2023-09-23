import { Component, OnInit } from '@angular/core';

import { Message, MessageList } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: MessageList | undefined;
  message: Message | undefined;

  constructor(
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this._messageService.getAllMessages().subscribe((messages: MessageList) => {
      this.messages = messages;
      if (messages?.count > 0) {
        this.message = messages.results[0];
      } 
    });
  }

  newMessages(id: number) {
    if (this.messages) {
      this.message = undefined;

      for (let msg of this.messages?.results) {
        if (msg.id == id) {
          this.message = msg;
        }
      }
    }
  }

}
