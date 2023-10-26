import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormRecord, FormControl, Validators } from '@angular/forms';

import {
  Education,
  EducationList,
  EducationError
} from '../education';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.css']
})
export class EducationCreateComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  educationForm: FormRecord =  new FormRecord({
    institution: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    study_area: new FormControl('', [Validators.required]),
    study_type: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    gpa: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])

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
    private _router: Router
  ) { }

  ngOnInit() { }

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

    this._educationService.createEducation(education).subscribe((education: Education) => {
      alert("Education Added.");
      this._router.navigate([`/education`]);

    },
    (error:any)=>{
      console.log(error);
      if (error.status == 400) {
        this.educationError = error.error;
      }        

      this.isFailed = true;
      this.isSuccessful = false;
      alert("Adding Education Failed.");
    })
  }

}
