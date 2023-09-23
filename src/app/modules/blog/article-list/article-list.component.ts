import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent  implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
