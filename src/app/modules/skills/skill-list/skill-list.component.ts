import { Component, OnInit } from '@angular/core';
import { FormArray, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {
  Skill,
  SkillList,
  SkillError,
  SkillKeyword,
  TechnicalSkillList
} from '../skill';
import {
  SkillService
} from '../skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  skills: SkillList | undefined;
  skillKeywords: SkillKeyword[] = []; 


  constructor(
    private _skillService: SkillService
  ) { }

  ngOnInit(): void {
    // Fetch skill list Data 
    this._skillService.getSkillList().subscribe((skills: SkillList) => {
      this.skills = skills;
      // populate skillKeywords
      for (let skill of skills?.results) {
        this.skillKeywords = this.skillKeywords.concat(skill.keywords);
      }
    });
  }

  removeSkill(skill: Skill){
    let deleteConfirm = confirm("DELETE '"+skill.name+"' skill? Click OK to confirm.");
    if (deleteConfirm) {
      this._skillService.deleteSkill(skill?.id ?? 0).subscribe(() => {

        alert("Delete '"+skill.name+"' Success!");
        console.log("Delete '"+skill.name+"' Success!");
        // Fetch Project list Data 
        this._skillService.getSkillList().subscribe((skills: SkillList) => {
          this.skills = skills;
        });

      },(error: any) => {
        console.log("Delete '"+skill.name+"' Failed");
        console.log(error);
        alert("Delete '"+skill.name+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+skill.name+"' Canceled!");
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
