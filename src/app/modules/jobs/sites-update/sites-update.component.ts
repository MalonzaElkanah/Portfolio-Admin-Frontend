import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

import {
  JobSite,
  JobSiteError
} from '../jobs';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-sites-update',
  templateUrl: './sites-update.component.html',
  styleUrls: ['./sites-update.component.css']
})
export class SitesUpdateComponent implements OnInit {
  site!: JobSite;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  siteForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  siteError: JobSiteError = { }

  constructor(
    private _jobService: JobsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.site = data['site'];
    })

  }

  ngOnInit() { 
    this.siteForm =  new FormRecord({
      site_name: new FormControl(this.site.site_name, [Validators.required]),
      job_list_link: new FormControl(this.site.job_list_link, [Validators.required]),
      job_link_element: new FormControl(this.site.job_link_element, [Validators.required]),
      site_type: new FormControl(this.site.site_type, [Validators.required]),
      name_element: new FormControl(this.site?.name_element ?? ''),
      experience_element: new FormControl(this.site?.experience_element ?? ''),
      description_element: new FormControl(this.site?.description_element ?? ''),
      organization_element: new FormControl(this.site?.organization_element ?? ''),
      address_element: new FormControl(this.site?.address_element ?? ''),
      deadline_element: new FormControl(this.site?.deadline_element ?? ''),
      attribute_element: new FormControl(this.site?.attribute_element ?? ''),
      qualification_element: new FormControl(this.site?.qualification_element ?? ''),
    });
  }

  submitSiteForm() {
    console.log("SITE DATA SUBMITTED!!");
    console.log(this.siteForm.value);

    let jobSite: JobSite = {
      site_name: this.siteForm.value["site_name"],
      job_list_link: this.siteForm.value["job_list_link"],
      job_link_element: this.siteForm.value["job_link_element"],
      site_type: this.siteForm.value["site_type"],
      name_element: this.siteForm.value["name_element"],
      experience_element: this.siteForm.value["experience_element"],
      description_element: this.siteForm.value["description_element"],
      organization_element: this.siteForm.value["organization_element"],
      address_element: this.siteForm.value["address_element"],
      deadline_element: this.siteForm.value["deadline_element"],
      attribute_element: this.siteForm.value["attribute_element"],
      qualification_element: this.siteForm.value["qualification_element"]
    }

    this._jobService.updateJobSite(this.site?.id ?? 0, jobSite).subscribe(
      (site: JobSite) => {
        alert("Site Updated.");
        this._router.navigate([`/job/sites`]);

      },
      (error:any)=>{
        console.log(error);
        if (error.status == 400) {
          this.siteError = error.error;
        }        

        this.isFailed = true;
        this.isSuccessful = false;
        alert("Updating Job Failed.");
      }
    )
  }
}
