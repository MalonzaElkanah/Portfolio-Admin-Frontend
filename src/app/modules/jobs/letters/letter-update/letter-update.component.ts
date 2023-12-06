import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import {
  Letter,
  LetterError
} from '../../jobs';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-letter-update',
  templateUrl: './letter-update.component.html',
  styleUrls: ['./letter-update.component.css']
})
export class LetterUpdateComponent implements OnInit {
  letter!: Letter;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  letterForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  letterError: LetterError = { }

  config = { }

  constructor(
    private _jobService: JobsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.letter = data['letter'];
    })
  }

  ngOnInit() { 
    this.letterForm =  new FormRecord({
      name: new FormControl(this.letter.name, [Validators.required]),
      text: new FormControl(this.letter.text, [Validators.required])
    });
  }

  submitLetterForm() {
    console.log("Letter DATA SUBMITTED!!");
    console.log(this.letterForm.value);

    let letter: Letter = {
      name: this.letterForm.value["name"],
      text: this.letterForm.value["text"]
    }

    this._jobService.updateLetter(this.letter?.id ?? 0, letter).subscribe(
      (letter: Letter) => {
        alert("Letter Updated.");
        this._router.navigate([`/jobs/letters`]);
      },
      (error:any)=>{
        console.log(error);
        if (error.status == 400) {
          this.letterError = error.error;
        }        

        this.isFailed = true;
        this.isSuccessful = false;
        alert("Updating Letter Failed.");
      }
    )
  }

}
