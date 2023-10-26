import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {
  SkillKeyword,
  TechnicalSkill,
  TechnicalSkillList
} from '../skill';
import {
  SkillService
} from '../skill.service';

@Component({
  selector: 'app-tech-skills',
  templateUrl: './tech-skills.component.html',
  styleUrls: ['./tech-skills.component.css']
})
export class TechSkillsComponent implements OnInit {
  techSkill: TechnicalSkillList | undefined;
  @Input() skillKeywords: SkillKeyword[] = [];

  techSkillForm: FormArray = new FormArray([
    new FormRecord({
      skill_keyword: new FormControl(''),
      percentage: new FormControl('')
    })
  ]);

  private getTechSkillList() {
    this._skillService.getTechSkillList().subscribe((skills: TechnicalSkillList) => {
      this.techSkill = skills;
      this.techSkillForm = new FormArray([
        new FormRecord({
          skill_keyword: new FormControl(''),
          percentage: new FormControl('')
        })
      ]);


      if (this.techSkill?.count > 0) {
        this.techSkillForm.removeAt(0);

        for (let skill of this.techSkill.results) {
          this.techSkillForm.push(
            new FormRecord({
              skill_keyword: new FormControl(skill.skill_keyword.id ?? ''),
              percentage: new FormControl(skill.percentage ?? '')
            })
          );
        }

      }
    });
  }

  private retrieveSkillKeyword(id: number) {
    if (this.skillKeywords) {
      for (let item of this.skillKeywords) {
        if (item?.id == id) {
          return item
        }
      }
    }
    return undefined
  }

  constructor(
    private _skillService: SkillService
  ) { }

  ngOnInit(): void {
    // Fetch technical list Data
    this.getTechSkillList();
  }

  getTechSkillFormRecord(index: number) {
    let formArray = this.techSkillForm as FormArray;
    return formArray.at(index) as FormRecord;
  }

  addTechSkillFormRecord() {
    let newFormRecord = new FormRecord({
      skill_keyword: new FormControl(''),
      percentage: new FormControl('')
    });

    this.techSkillForm.push(newFormRecord);
  }

  removeTechSkill(index: number) {
    let formArray = this.techSkillForm as FormArray;
    let keywords = this.techSkill?.results;

    if (keywords) {
      if (index < keywords.length ?? index ) {

        this._skillService.deleteTechSkill(keywords[index]?.id ?? 0).subscribe(
          ()=>{
            formArray.removeAt(index);
            alert("Technical Skill Deleted");
            // Fetch technical list Data
            this.getTechSkillList();
          }, err =>{
            console.log(err);
            alert("Deleting Keyword Failed.");
          }
        );
      } else {
        formArray.removeAt(index);
        alert("Technical Skill Deleted");
      }
    } else {
      formArray.removeAt(index);
      alert("Technical Skill Deleted");
    }
  
  }

  submitTechForm() {
    console.log("TECH DATA SUBMITTED!!");
    console.log(this.techSkillForm.value);
    let formValues = this.techSkillForm.value;
    let keywords!: [TechnicalSkill];
    let index = 0;
    
    for (let skill of formValues) {
      if (this.techSkill?.results) {

        if (index < this.techSkill.results.length){
          if (this.techSkill.results[index].skill_keyword.id != parseInt(skill["skill_keyword"]) || 
            this.techSkill.results[index].percentage != parseInt(skill["percentage"])
          ){
            skill["skill_keyword"] = this.retrieveSkillKeyword(parseInt(skill["skill_keyword"]));

            this._skillService.updateTechSkill(
              this.techSkill.results[index]?.id ?? 0,
              skill
            ).subscribe(
              (skill: TechnicalSkill) => { 
                // this.techSkill?.results[index] = skill; 
                console.log("Tech Skill "+skill.skill_keyword+" Updated!");
                // Fetch technical list Data
                this.getTechSkillList();
              }
            );
          }

        } else {
          skill["skill_keyword"] = this.retrieveSkillKeyword(parseInt(skill["skill_keyword"]));

          this._skillService.createTechSkill(skill).subscribe(
            (skill: TechnicalSkill) => { 
              // this.techSkill?.results.push(skill);
              console.log("Tech Skill "+skill.skill_keyword+" Added!");
              // Fetch technical list Data
              this.getTechSkillList();
            }
          );
        }

        index = index + 1;
      } else {
        skill["skill_keyword"] = this.retrieveSkillKeyword(parseInt(skill["skill_keyword"]));

        this._skillService.createTechSkill(skill).subscribe(
          (skill: TechnicalSkill) => { 
            console.log("Tech Skill "+skill.skill_keyword+" Added!");
            // Fetch technical list Data
            this.getTechSkillList();
          }
        );
      }

    }
    alert("Technical Skills Updated");

  }


}
