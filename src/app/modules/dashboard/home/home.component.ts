import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import * as $ from 'jquery';

import { 
  ActivityLog,
  ActivityLogList
} from '../dashboard';
import { DashboardService } from '../dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logs: ActivityLogList | undefined;
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  search_keyword = '';

  constructor(
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    // Fetch Logs Data 
    this._dashboardService.getActivityLogs().subscribe((logs: ActivityLogList) => {
      this.logs = logs;
    });
  }

  getResponseColor(statusCode: string) {
    let code = parseInt(statusCode);
  
    if (code >= 500) {
      return "text-danger"
    } else if (code >= 400) {
      return "text-warning"
    } else if (code >= 300) {
      return "text-primary"
    } else if (code >= 200) {
      return "text-success"
    } else {
      return "text-secondary"
    }
  }

  searchLogs(search: string): void {
    this.search_keyword = search;
    this._dashboardService.getActivityLogs(search).subscribe((logs: ActivityLogList) => {
      this.logs = logs;
    });
  }

  pageLogs(page: string) {
    this._dashboardService.getActivityLogs(
      this.search_keyword,
      page
    ).subscribe((logs: ActivityLogList) => {
      this.logs = logs;
    });
  }
}
