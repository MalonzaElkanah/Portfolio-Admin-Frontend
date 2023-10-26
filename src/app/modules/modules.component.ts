// import * as $ from 'jquery';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(){
    // $(".loader").fadeOut("slow");
  }

}
