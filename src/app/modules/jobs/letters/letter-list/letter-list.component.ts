import { Component, OnInit } from '@angular/core';

import {
  Letter,
  LetterList
} from '../../jobs';
import { JobsService } from '../../jobs.service';


@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  letters: LetterList = {
    count: 0,
      previous: '',
      next: '',
      results: []
  }
  constructor(
    private _jobService: JobsService
  ) { }

  ngOnInit(): void {
    this.getLetters();
  }

  getLetters() {
    this._jobService.getLetters().subscribe(
      (letters: LetterList) => {
        this.letters = letters;
      }
    );
  }

  removeLetter(letter: Letter){
    let deleteConfirm = confirm("DELETE '"+letter.name+"' Letter? Click OK to confirm.");
    if (deleteConfirm) {
      this._jobService.deleteLetter(letter?.id ?? 0).subscribe(
        () => {
          alert("Delete '"+letter.name+"' Success!");
          console.log("Delete '"+letter.name+"' Success!");
          this.getLetters();

        },
        (error: any) => {
          console.log("Delete '"+letter.name+"' Failed");
          console.log(error);
          alert("Delete '"+letter.name+"' Failed!");
        }
      )      
    } else {
      console.log("delete of '"+letter.name+"' Canceled!");
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
