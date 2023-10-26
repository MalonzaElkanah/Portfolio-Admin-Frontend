import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import {
    Work,
    WorkList,
    WorkError,
    Highlight,
    HighlightList
} from '../work';
import { WorkService } from '../work.service';


@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrls: ['./work-update.component.css']
})
export class WorkUpdateComponent implements OnInit {
  work!: Work; 

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  highlightForm: FormArray = new FormArray([
    new FormRecord({
      name: new FormControl('')
    })
  ]);

  workForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
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
    private _route: ActivatedRoute,
    private _workService: WorkService,
    private _router: Router
  ) {
    this._route.data.subscribe(data => {
      this.work = data['work'];
    });

  }

  ngOnInit(){

    if (this.work.highlights) {
      let highlights = this.work.highlights;

      this.highlightForm.removeAt(0);

      for (let highlight of highlights) {
        this.highlightForm.push(
          new FormRecord({
            name: new FormControl(highlight.name ?? '')
          })
        );
      }

    }

    this.workForm =  new FormRecord({
      company: new FormControl(this.work.company, [Validators.required]),
      location: new FormControl(this.work.location, [Validators.required]),
      position: new FormControl(this.work.position, [Validators.required]),
      website: new FormControl(this.work.website, [Validators.required]),
      start_date: new FormControl(this.work.start_date, [Validators.required]),
      end_date: new FormControl(this.work.end_date, [Validators.required]),
      highlights: this.highlightForm

    });

  }

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
    let highlights = this.work.highlights;
    let formArray = this.workForm.get("highlights") as FormArray;

    if (highlights) {
      if (index < highlights.length ?? index ) {
      
        let name = highlights[index]?.name ?? '';

        this._workService.deleteHighlights(
          this.work?.id ?? 0,
          highlights[index]?.id ?? 0
        ).subscribe(()=>{
          formArray.removeAt(index);

          alert("highlight Deleted");

          },
          err =>{
            console.log(err);

            alert("Delete Failed");
          } 
        );

        this._workService.getHighlights(this.work?.id ?? 0).subscribe(
          (highlights: HighlightList) => {
            if (highlights?.results){
              this.work.highlights = highlights.results
            }
          }
        );
      } else {
        formArray.removeAt(index);
        alert("Highlight Deleted");
      }
    } else {
      formArray.removeAt(index);
      alert("Highlight Deleted");
    }

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

    this._workService.updateWork(this.work?.id ?? 0, work).subscribe((work: Work) => {
      alert("Work Updated.");
      this._router.navigate([`/work`]);

    },
    (error:any) => {
      console.log(error);
      if (error.status == 400) {
        this.workError = error.error;
      }        

      this.isFailed = true;
      this.isSuccessful = false;
      alert("Update Work Failed.");
    })
  }

}
