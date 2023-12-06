import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import {
  Letter,
  LetterError
} from '../../jobs';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-letter-create',
  templateUrl: './letter-create.component.html',
  styleUrls: ['./letter-create.component.css']
})
export class LetterCreateComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  letterForm: FormRecord =  new FormRecord({
    name: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required])
  });

  letterError: LetterError = { }
  config = {}

  constructor(
    private _jobService: JobsService,
    private _router: Router
  ) { }

  ngOnInit() { }

  submitLetterForm() {
    console.log("DATA SUBMITTED!!");
    console.log(this.letterForm.value);

    let letter: Letter = {
      name: this.letterForm.value["name"],
      text: this.letterForm.value["text"]
    }

    this._jobService.createLetter(letter).subscribe(
      (letter: Letter) => {
        alert("Letter Added");

        // Redirect to sites view
        this._router.navigate([`/jobs/letters`]);

      },
      (error:any)=>{
        console.log(error);
        if (error.status == 400) {
          this.letterError = error.error;
        }

        this.isFailed = true;
        this.isSuccessful = false;
        alert("Creating Letter Failed");
      }
    )
  }


}
