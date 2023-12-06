import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

import {
  Job,
  JobApplication,
  JobApplicationError,
  LetterList,
  Letter
} from '../jobs';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @ViewChild("iframe") iframe!: any;

  job!: Job;
  applications: JobApplication[] = [];
  letters: LetterList = {
    count: 0,
    previous: '',
    next: '',
    results: []
  };

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  applicationForm: FormRecord =  new FormRecord({
    letter: new FormControl(''),
    cover_letter: new FormControl('', [Validators.required]),
    application_type: new FormControl('', [Validators.required])
  });

  applicationError: JobApplicationError = { }
  config = {}

  letterText: any = "";

  constructor(
    private _jobService: JobsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.job = data['job'];
      this.getLetters();
      this.getApplications();
    })
  }

  ngOnInit() { }

  getApplications() {
    this._jobService.getJobApplications(this.job?.id ?? 0).subscribe(
      (applications: JobApplication[]) => {
        this.applications = applications;

        if (this.applications.length > 0) {
          this.applicationForm = new FormRecord({
            letter: new FormControl(this.applications[0]?.letter ?? ''),
            cover_letter: new FormControl(this.applications[0]?.cover_letter ?? '', [Validators.required]),
            application_type: new FormControl(this.applications[0]?.application_type ?? ''),
            feedback: new FormControl(this.applications[0]?.feedback ?? ''),
            feedback_type: new FormControl(this.applications[0]?.feedback_type ?? '')
          });
        }
      }
    );
  }

  getLetters() {
    this._jobService.getLetters().subscribe(
      (letters: LetterList) => {
        this.letters = letters;
      }
    );
  }

  pickLetter(event: any) {
    console.log("Pick Letter Event");
    console.log(event)
    console.log(event?.target); // event?.target.files
    let value:any = event?.target?.value;

    if (value === "") {
      console.log("Value: "+value);
    } else if (!isNaN(parseInt(value))) {
      value = parseInt(value);

      this._jobService.getRenderedJobLetter(this.job?.id ?? 0, value).subscribe(
        (letter: Letter) => {
          console.log("Letter: "+letter.strip_tag_text);
          this.applicationForm.patchValue({cover_letter: letter.text});
          this.letterText = letter.text;
        },
        err => {
          for (let letter of this.letters.results) {
            if (value == letter?.id) {
              console.log("Letter: "+letter.strip_tag_text);
              this.applicationForm.patchValue({cover_letter: letter.text});
              this.letterText = letter.text;
            }
          }
        }
      );
    }

  }

  submitApplicationForm() {
    console.log("Applcation DATA SUBMITTED!!");
    console.log(this.applicationForm.value);

    if (this.applications.length > 0) {
      let application: JobApplication = {
        job: this.job?.id ?? 0,
        cover_letter: this.applicationForm.value["cover_letter"],
        application_type: this.applicationForm.value["application_type"],
        // feedback: this.applicationForm.value["feedback"],
        feedback_type: this.applicationForm.value["feedback_type"],
      }      

      this._jobService.updateApplication(this.applications[0]?.id ?? 0, application).subscribe(
        (application: JobApplication) => {
          alert("Job Application Updated");
          this.getApplications();
          this.applicationError = { }
        },
        (error:any)=>{
          console.log(error);
          if (error.status == 400) {
            this.applicationError = error.error;
          }

          this.isFailed = true;
          this.isSuccessful = false;
          alert("Update Job Application Failed");
        }
      )
    } else {
      let application: JobApplication = {
        cover_letter: this.applicationForm.value["cover_letter"],
        application_type: this.applicationForm.value["application_type"],
        job: this.job?.id ?? 0,
        letter: this.applicationForm.value["letter"]
      }

      this._jobService.createApplication(application).subscribe(
        (application: JobApplication) => {
          alert("Job Applied");
          this.getApplications();
          this.applicationError = { }
        },
        (error:any)=>{
          console.log(error);
          if (error.status == 400) {
            this.applicationError = error.error;
          }

          this.isFailed = true;
          this.isSuccessful = false;
          alert("Job Application Failed");
        }
      )

    }
  }

  updateIframe(letterText :string) {
    this.letterText = letterText;
  }

  copyLetterText() {
    this.letterText = this.applicationForm.value["cover_letter"];

    let div = document.createElement("div");
    div.innerHTML = this.letterText;
    let text = div.textContent || div.innerText || "";
    // console.log(text);
    // console.log(div);
    navigator.clipboard.writeText(text);
  }

  printPreview() {
    // this.letterText = this.applicationForm.value["cover_letter"];
    var iframe = this.iframe.nativeElement;
    iframe.contentWindow.print();
  }

}
