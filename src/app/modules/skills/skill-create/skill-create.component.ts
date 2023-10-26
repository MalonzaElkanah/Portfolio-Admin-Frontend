import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {
  Skill,
  SkillList,
  SkillError,
  SkillKeyword
} from '../skill';
import {
  SkillService
} from '../skill.service';


@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent implements OnInit {

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  selectedItems!:any;

  skillForm: FormRecord =  new FormRecord({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    keywords: new FormControl()
  });

  skillError: SkillError = {
    name: [''],
    description: [''],
    keywords: ['']
  }

  constructor(
    private _skillService: SkillService,
    private _router: Router
  ) { }

  ngOnInit(){ }

  addTagFn(name: string) {
    return { name: name };
  }

  submitSkillForm() {
    console.log("SKILL DATA SUBMITTED!!");
    console.log(this.selectedItems);
    console.log(this.skillForm.value);

    let skill: Skill = {
      name: this.skillForm.value["name"],
      description: this.skillForm.value["description"],
      keywords: this.skillForm.value["keywords"]
    }

    this._skillService.createSkill(skill).subscribe((skill: Skill) => {
      alert("Skill Added");
      this._router.navigate([`/skills`]);

    },
    (error:any)=>{
      
      console.log(error);
      if (error.status == 400) {
        this.skillError = error.error;
      }        
      // this.errorMessage = err.error.message;
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Creating New Skill Failed");
    })
  }

}
