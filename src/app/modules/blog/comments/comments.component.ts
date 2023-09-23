import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent  implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
