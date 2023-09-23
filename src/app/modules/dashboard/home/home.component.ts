import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as $ from 'jquery';
// import {DataTables} from 'angular-datatables';
// http://l-lin.github.io/angular-datatables/#/getting-started

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  constructor(){ }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  ngAfterViewInit() { }

}
