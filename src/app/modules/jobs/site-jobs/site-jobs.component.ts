import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  JobSite,
  Job,
  JobList
} from '../jobs';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-site-jobs',
  templateUrl: './site-jobs.component.html',
  styleUrls: ['./site-jobs.component.css']
})
export class SiteJobsComponent implements OnInit {
  site!: JobSite;
  jobs: Job[] = [];

  constructor(
    private _jobService: JobsService,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.site = data['site'];
    })
  }

  ngOnInit() {
    this.getSiteJobs();
  }

  getSiteJobs() {
    this._jobService.getJobSiteJobs(this.site?.id ?? 0).subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
      }
    );
  }

  removeJob(job: Job){
    let deleteConfirm = confirm("DELETE '"+job.name+"' Job? Click OK to confirm.");
    if (deleteConfirm) {
      this._jobService.deleteJob(job?.id ?? 0).subscribe(
        () => {
          alert("Delete '"+job.name+"' Success!");
          console.log("Delete '"+job.name+"' Success!");

          this.getSiteJobs();
        },
        (error: any) => {
          console.log("Delete '"+job.name+"' Failed");
          console.log(error);
          alert("Delete '"+job.name+"' Failed!");
        }
      )      
    } else {
      console.log("delete of '"+job.name+"' Canceled!");
    }
  }

  scrapSite() {
    let scrapConfirm = confirm("Scrap '"+this.site.site_name+"' Site? Click OK to confirm.");

    if (scrapConfirm) {
      this._jobService.scrapJobSite(this.site?.id ?? 0).subscribe(
        () => {
          alert("Scrap '"+this.site.site_name+"' Success!");
          console.log("Scrapping '"+this.site.site_name+"' Success!");

          this.getSiteJobs();
        },
        (error: any) => {
          console.log("Scrapping '"+this.site.site_name+"' Failed");
          console.log(error);
          alert("Scrapping '"+this.site.site_name+"' Failed!");
        }
      )      
    } else {
      console.log("Scrapping of '"+this.site.site_name+"' Canceled!");
    }
  }

  slugify(str: string): string {
    return str.toLowerCase(
      ).trim(
      ).replace(
        /[^\w\s-]/g,
        ''
      ).replace(
        /[\s_-]+/g,
        '-'
      ).replace(
        /^-+|-+$/g,
        ''
      );
  }

  binarify(int: number): string {
    return btoa(int.toString())
  }

}
