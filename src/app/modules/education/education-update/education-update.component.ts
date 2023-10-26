import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormRecord, FormControl, Validators } from '@angular/forms';

import {
  Education,
  EducationList,
  EducationError
} from '../education';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-education-update',
  templateUrl: './education-update.component.html',
  styleUrls: ['./education-update.component.css']
})
export class EducationUpdateComponent implements OnInit {
  education!: Education;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  educationForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  educationError: EducationError = {
    institution: [''],
    location: [''],
    study_area: [''],
    study_type: [''],
    start_date: [''],
    end_date: [''],
    gpa: [''],
    description: ['']
  }

  constructor(
    private _educationService: EducationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.education = data['education'];
    })

  }

  ngOnInit() { 
    this.educationForm =  new FormRecord({
      institution: new FormControl(this.education.institution, [Validators.required]),
      location: new FormControl(this.education.location, [Validators.required]),
      study_area: new FormControl(this.education.study_area, [Validators.required]),
      study_type: new FormControl(this.education.study_type, [Validators.required]),
      start_date: new FormControl(this.education.start_date, [Validators.required]),
      end_date: new FormControl(this.education.end_date, [Validators.required]),
      gpa: new FormControl(this.education.gpa, [Validators.required]),
      description: new FormControl(this.education.description, [Validators.required])

    });
  }

  submitEducationForm() {
    console.log("EDUCATION DATA SUBMITTED!!");
    console.log(this.educationForm.value);

    let education: Education = {
      institution: this.educationForm.value["institution"],
      location: this.educationForm.value["location"],
      study_area: this.educationForm.value["study_area"],
      study_type: this.educationForm.value["study_type"],
      start_date: this.educationForm.value["start_date"],
      end_date: this.educationForm.value["end_date"],
      gpa: this.educationForm.value["gpa"],
      description: this.educationForm.value["description"] 
    }

    this._educationService.updateEducation(
      this.education?.id ?? 0,
      education
    ).subscribe((education: Education) => {
      alert("Education Updated.");
      this._router.navigate([`/education`]);

    },
    (error:any)=>{
      console.log(error);
      if (error.status == 400) {
        this.educationError = error.error;
      }        

      this.isFailed = true;
      this.isSuccessful = false;
      alert("Updating Education Failed.");
    })
  }

}
