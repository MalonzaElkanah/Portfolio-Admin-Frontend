import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import {
    Work,
    WorkList,
    WorkError
} from '../work';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
  styleUrls: ['./work-create.component.css']
})

export class WorkCreateComponent {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  highlightForm: FormArray = new FormArray([
    new FormRecord({
      name: new FormControl('')
    })
  ]);

  workForm: FormRecord =  new FormRecord({
    company: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    highlights: this.highlightForm

  });


  workError: WorkError = {
    company: [''],
    location: [''],
    position: [''],
    website: [''],
    start_date: [''],
    end_date: ['']
    // highlights: [''];
  }

  constructor(
    private _workSevice: WorkService,
    private _router: Router
  ) { }

  ngOnInit(){ }

  getHighlightFormRecord(index: number) {
    let formArray = this.workForm.get("highlights") as FormArray;
    return formArray.at(index) as FormRecord;
  }

  addHighlightFormRecord() {
    let newFormRecord = new FormRecord({
      name: new FormControl('')
    });

    this.highlightForm.push(newFormRecord);
  }

  deleteHighlightFormRecord(index: number) {
    let formArray = this.workForm.get("highlights") as FormArray;
    formArray.removeAt(index);    
  }


  submitWorkForm() {
    console.log("WORK DATA SUBMITTED!!");
    console.log(this.highlightForm.value);
    console.log(this.workForm.value);

    let work: Work = {
      company: this.workForm.value["company"],
      location: this.workForm.value["location"],
      position: this.workForm.value["position"],
      website: this.workForm.value["website"],
      start_date: this.workForm.value["start_date"],
      end_date: this.workForm.value["end_date"],
      highlights: this.workForm.value["highlights"] 
    }

    this._workSevice.createWork(work).subscribe((work: Work) => {
      alert("Work Added.");
      this._router.navigate([`/work`]);

    },
    (error:any)=>{
      console.log(error);
      if (error.status == 400) {
        this.workError = error.error;
      }        

      this.isFailed = true;
      this.isSuccessful = false;
      alert("Adding Work Failed.");
    })
  }
}
