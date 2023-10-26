import { Component, OnInit } from '@angular/core';

import {
  Education,
  EducationList
} from '../education';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})
export class EducationListComponent implements OnInit {
  educationList!: EducationList;

  constructor(
    private _educationService: EducationService
  ) {

    this._educationService.getEducationList().subscribe((education: EducationList) => {
      this.educationList = education;
    });

  }

  ngOnInit(): void { }

  removeEducation(education: Education){
    let deleteConfirm = confirm("DELETE '"+education.study_area+", \
      "+education.study_type+"' education? Click OK to confirm.");

    if (deleteConfirm) {
      this._educationService.deleteEducation(education?.id ?? 0).subscribe(() => {

        alert("Delete Success!");
        console.log("Delete '"+education.study_area+", "+education.study_type+"' Success!");

        this._educationService.getEducationList().subscribe((education: EducationList) => {
          this.educationList = education;
        });

      },(error: any) => {
        console.log("Delete '"+education.study_area+", "+education.study_type+"' Failed");
        console.log(error);
        alert("Delete '"+education.study_area+", "+education.study_type+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+education.study_area+", "+education.study_type+"' Canceled!");
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
