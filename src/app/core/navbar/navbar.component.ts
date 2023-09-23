import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  user: any = {};

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this._authService.getUserProfile();
  }

  ngAfterViewInit() {
    feather.replace();
  }

  signOut() {
    this._authService.signOut();
  }

}
