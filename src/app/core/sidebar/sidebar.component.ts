import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Feather Icons
    feather.replace();
  }

}
