import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-skill-update',
  templateUrl: './skill-update.component.html',
  styleUrls: ['./skill-update.component.css']
})
export class SkillUpdateComponent implements OnInit {
  skill!: Skill;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  selectedItems:Array<any> = new Array();

  skillForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  skillError: SkillError = {
    name: [''],
    description: [''],
    keywords: ['']
  }

  constructor(
    private _skillService: SkillService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe((data) => {
      this.skill = data["skill"];

      for (let keyword of this.skill.keywords ?? []) {
        this.selectedItems.push({"name": keyword.name});
      }
    });
  }

  ngOnInit(){
    this.skillForm =  new FormRecord({
      name: new FormControl(this.skill.name, [Validators.required]),
      description: new FormControl(this.skill.description, [Validators.required]),
      keywords: new FormControl(this.skill.keywords)
    });
  }

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

    this._skillService.updateSkill(this.skill?.id ?? 0, skill).subscribe((skill: Skill) => {
      alert("Skill Updated.");
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
      alert("Updated Failed");
    })
  }

}
