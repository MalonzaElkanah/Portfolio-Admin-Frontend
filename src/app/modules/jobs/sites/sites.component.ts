import {
  Component,
  OnInit 
} from '@angular/core';

import {
  JobSite,
  JobSiteList
} from '../jobs';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  jobSites!: JobSiteList;

  constructor(
    private _jobService: JobsService
  ) {
    this.jobSites = {
      count: 0,
      previous: '',
      next: '',
      results: []
    }
  }

  ngOnInit(): void {
    // Fetch job sites 
    this.getSites();
  }

  getSites(page?: string) {
    if (page){
      this._jobService.getJobSites('', page).subscribe(
        (sites: JobSiteList) => {
          this.jobSites = sites;
        }
      );

    }else{
      this._jobService.getJobSites().subscribe(
        (sites: JobSiteList) => {
          this.jobSites = sites;
        }
      );
    }
  }

  removeSite(site: JobSite){
    let deleteConfirm = confirm("DELETE '"+site.site_name+"' site? Click OK to confirm.");
    if (deleteConfirm) {
      this._jobService.deleteJobSite(site?.id ?? 0).subscribe(
        () => {
          alert("Delete '"+site.site_name+"' Success!");
          console.log("Delete '"+site.site_name+"' Success!");
          this.getSites();

        },
        (error: any) => {
          console.log("Delete '"+site.site_name+"' Failed");
          console.log(error);
          alert("Delete '"+site.site_name+"' Failed!");
        }
      )      
    } else {
      console.log("delete of '"+site.site_name+"' Canceled!");
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
