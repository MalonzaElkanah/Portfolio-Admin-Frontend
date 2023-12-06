import {
  Component,
  OnInit 
} from '@angular/core';

import {
  JobApplicationList,
  JobApplication
} from '../jobs';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: JobApplication[] = [];

  constructor(
    private _jobService: JobsService
  ){ }

  ngOnInit(): void { 
    this.getApplications();
  }

  getApplications() {
    this._jobService.getApplications().subscribe(
      (applications: JobApplication[]) => {
        this.applications = applications;
      }
    );
  }

  removeApplication(application: JobApplication){
    let deleteConfirm = confirm("DELETE Application? Click OK to confirm.");
    if (deleteConfirm) {
      this._jobService.deleteApplication(application?.id ?? 0).subscribe(
        () => {
          alert("Delete Application Success!");
          console.log("Delete Application Success!");
          this.getApplications();

        },
        (error: any) => {
          console.log("Delete Application Failed");
          console.log(error);
          alert("Delete Application Failed!");
        }
      )      
    } else {
      console.log("delete of Application Canceled!");
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
