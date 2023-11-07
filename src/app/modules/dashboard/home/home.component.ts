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
  ActivityLogList,
  VisitorCount,
  VisitorCountList,
  VisitorStat
} from '../dashboard';
import { DashboardService } from '../dashboard.service';
import { environment } from 'src/environments/environment';

import { ChartComponent } from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  // ApexResponsive,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
} from "ng-apexcharts";

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries;
  // colors: any;
  // responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  labels: any;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("chart0", { static: false }) chart!: ChartComponent;
  public monthlyChartOption!: ChartOptions;

  @ViewChild("chart1", { static: false }) chart1!: ChartComponent;
  public weeklyChartOption!: ChartOptions;
  @ViewChild("chart2", { static: false }) chart2!: ChartComponent;
  public dailyChartOption!: ChartOptions;

  @ViewChild("chart3", { static: false }) chart3!: ChartComponent;
  public yearlyChartOption!: ChartOptions;

  visitorStat: VisitorStat = {
    "day": 0,
    "week": 0,
    "month": 0,
    "year": 0
  }

  logs: ActivityLogList | undefined;
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  search_keyword = '';

  constructor(
    private _dashboardService: DashboardService
  ) {
    let labels: any[] = []
    let series: any[] = []
    this.dailyChartOption = this.chartOption(labels, series, series)
    this.weeklyChartOption = this.chartOption(labels, series, series)
    this.monthlyChartOption = this.chartOption(labels, series, series)
    this.yearlyChartOption = this.chartOption(labels, series, series)
  }

  ngOnInit(): void {
    // Fetch Logs Data 
    this._dashboardService.getActivityLogs().subscribe((logs: ActivityLogList) => {
      this.logs = logs;
    });
    // Fetch chart data
    this.getDailyChartOption()
    this.getWeeklyChartOption()
    this.getMonthlyChartOption()
    this.getYearlyChartOption()

    // getVisitorStats 
    this._dashboardService.getVisitorStats().subscribe((stat: VisitorStat) => {
      this.visitorStat = stat;
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

  private chartOption(
    labels:any[],
    series:any[],
    series2:any[]
  ): ChartOptions {
    let chartOption: ChartOptions = {
      series: [
        {
          name: 'Visitors',
          type: 'column',
          data: series
        },
        {
          name: 'Requests',
          type: 'line',
          data: series2
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        lineCap: "round"
      },
      // colors: ["#20E647"],

      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: labels, // []
      xaxis: {
        title: {
          text: 'Date',
        },
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Visitors',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
                return y.toFixed(0) + "";
            }
            return y;      
          }
        }
      }
    };

    return chartOption;
  }

  private getDailyChartOption(): void {
    let labels: any[] = []
    let series: any[] = []
    let requests: any[] = []

    this._dashboardService.getDailyVisitorCount().subscribe(
      (visitors: VisitorCountList) => {
        for (let visitor of visitors.results) {
          labels.push(visitor.date)
          series.push(visitor.ip_addresses.length)
          requests.push(visitor.requests_count)
        }

        this.dailyChartOption.series = [
          { data: series, type: 'column', name: 'Visitors' },
          { data: requests, type: 'line', name: 'Requests' }
        ]
        this.dailyChartOption.labels = labels
      }
    );
  }

  private getWeeklyChartOption(): void {
    let labels: any[] = []
    let series: any[] = []
    let requests: any[] = []

    this._dashboardService.getWeeklyVisitorCount().subscribe(
      (visitors: VisitorCountList) => {
        for (let visitor of visitors.results) {
          labels.push(visitor.date)
          series.push(visitor.ip_addresses.length)
          requests.push(visitor.requests_count)
        }

        this.weeklyChartOption.series = [
          { data: series, type: 'column', name: 'Visitors' },
          { data: requests, type: 'line', name: 'Requests' }
        ]
        this.weeklyChartOption.labels = labels
      }
    );
  }

  private getMonthlyChartOption(): void {
    let labels: any[] = []
    let series: any[] = []
    let requests: any[] = []

    this._dashboardService.getMonthlyVisitorCount().subscribe(
      (visitors: VisitorCountList) => {
        for (let visitor of visitors.results) {
          labels.push(visitor.date)
          series.push(visitor.ip_addresses.length)
          requests.push(visitor.requests_count)
        }

        this.monthlyChartOption.series = [
          { data: series, type: 'column', name: 'Visitors' },
          { data: requests, type: 'line', name: 'Requests' }
        ]
        this.monthlyChartOption.labels = labels
      }
    );
  }

  private getYearlyChartOption(): void {
    let labels: any[] = []
    let series: any[] = []
    let requests: any[] = []

    this._dashboardService.getMonthlyVisitorCount().subscribe(
      (visitors: VisitorCountList) => {
        for (let visitor of visitors.results) {
          labels.push(visitor.date)
          series.push(visitor.ip_addresses.length)
          requests.push(visitor.requests_count)
        }

        this.yearlyChartOption.series = [
          { data: series, type: 'column', name: 'Visitors' },
          { data: requests, type: 'line', name: 'Requests' }
        ]
        this.yearlyChartOption.labels = labels
      }
    );
  }



}
