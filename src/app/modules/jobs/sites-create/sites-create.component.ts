import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

import {
  JobSite,
  JobSiteError
} from '../jobs';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-sites-create',
  templateUrl: './sites-create.component.html',
  styleUrls: ['./sites-create.component.css']
})
export class SitesCreateComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  siteForm: FormRecord =  new FormRecord({
    site_name: new FormControl('', [Validators.required]),
    job_list_link: new FormControl('', [Validators.required]),
    job_link_element: new FormControl('', [Validators.required]),
    site_type: new FormControl('', [Validators.required]),
    name_element: new FormControl(''),
    experience_element: new FormControl(''),
    description_element: new FormControl(''),
    organization_element: new FormControl(''),
    address_element: new FormControl(''),
    deadline_element: new FormControl(''),
    attribute_element: new FormControl(''),
    qualification_element: new FormControl(''),
  });

  siteError: JobSiteError = { }

  constructor(
    private _jobService: JobsService,
    private _router: Router
  ) { }

  ngOnInit() { }

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

    this._jobService.createJobSite(jobSite).subscribe(
      (site: JobSite) => {
        alert("Job Site Added");

        // Redirect to sites view
        this._router.navigate([`/job/sites`]);

      },
      (error:any)=>{
        console.log(error);
        if (error.status == 400) {
          this.siteError = error.error;
        }

        this.isFailed = true;
        this.isSuccessful = false;
        alert("Creating Site Failed");
      }
    )
  }
}
