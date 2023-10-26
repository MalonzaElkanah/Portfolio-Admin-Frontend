import { Component, OnInit } from '@angular/core';
import { FormArray, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {
  ProfessionalSkill,
  ProfessionalSkillList
} from '../skill';
import {
  SkillService
} from '../skill.service';


@Component({
  selector: 'app-prof-skills',
  templateUrl: './prof-skills.component.html',
  styleUrls: ['./prof-skills.component.css']
})
export class ProfSkillsComponent implements OnInit {
  profSkill: ProfessionalSkillList | undefined;

  profSkillForm: FormArray = new FormArray([
    new FormRecord({
      name: new FormControl(''),
      percentage: new FormControl('')
    })
  ]);

  constructor(private _skillService: SkillService){ }

  ngOnInit(){
    // Fetch professional list Data
    this.getProfSkillList();
  }

  private getProfSkillList() {
    this._skillService.getProfSkillList().subscribe((skills: ProfessionalSkillList) => {
      this.profSkill = skills;

      this.profSkillForm = new FormArray([
        new FormRecord({
          name: new FormControl(''),
          percentage: new FormControl('')
        })
      ]);

      if (this.profSkill?.count > 0) {
        this.profSkillForm.removeAt(0);

        for (let skill of this.profSkill.results) {
          this.profSkillForm.push(
            new FormRecord({
              name: new FormControl(skill.name ?? ''),
              percentage: new FormControl(skill.percentage ?? '')
            })
          );
        }

      }

    });
  }

  getProfSkillFormRecord(index: number) {
    let formArray = this.profSkillForm as FormArray;
    return formArray.at(index) as FormRecord;
  }

  addProfSkillFormRecord() {
    let newFormRecord = new FormRecord({
      name: new FormControl(''),
      percentage: new FormControl('')
    });

    this.profSkillForm.push(newFormRecord);
  }

  removeProfSkill(index: number) {
    let formArray = this.profSkillForm as FormArray;
    let keywords = this.profSkill?.results;

    if (keywords) {
      if (index < keywords.length ?? index ) {

        this._skillService.deleteProfSkill(keywords[index]?.id ?? 0).subscribe(
          ()=>{
            formArray.removeAt(index);

            // Fetch professional list Data
            this.getProfSkillList();

            alert("Professional Skill Deleted");
          }, err =>{
            console.log(err);
            alert("Deleting Skill Failed.");
          }
        );
      } else {
        formArray.removeAt(index);
        alert("Professional Skill Deleted");
      }
    } else {
      formArray.removeAt(index);
      alert("Professional Skill Deleted");
    }
  
  }

  submitProfForm() {
    console.log("Prof-skill DATA SUBMITTED!!");
    console.log(this.profSkillForm.value);
    let formValues = this.profSkillForm.value;
    let index = 0;
    
    for (let skill of formValues) {
      if (this.profSkill?.results) {

        if (index < this.profSkill.results.length){
          if (this.profSkill.results[index].name != skill["name"] || 
            this.profSkill.results[index].percentage != parseInt(skill["percentage"])
          ){
            this._skillService.updateProfSkill(
              this.profSkill.results[index]?.id ?? 0,
              skill
            ).subscribe(
              (skill: ProfessionalSkill) => { 
                console.log("Skill "+skill.name+" Updated!");
                this.getProfSkillList();
              }
            );
          }

        } else {
          this._skillService.createProfSkill(skill).subscribe(
            (skill: ProfessionalSkill) => {
              console.log("Prof Skill "+skill.name+" Added!");
              // Fetch professional list Data
              this.getProfSkillList();
            }
          );
        }

        index = index + 1;
      } else {

        this._skillService.createProfSkill(skill).subscribe(
          (skill: ProfessionalSkill) => { 
            console.log("Prof Skill "+skill.name+" Added!");
            // Fetch professional list Data
            this.getProfSkillList();
          }
        );
      }

    }
    alert("Professional Skills Updated");

  }



}
