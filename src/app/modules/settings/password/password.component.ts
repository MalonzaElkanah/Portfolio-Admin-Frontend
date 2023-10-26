import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

import {
  PasswordSettings,
  PasswordSettingsError,
  DefaultResponse
} from '../settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  settingsForm: FormRecord =  new FormRecord({
    old_password: new FormControl(),
    confirm_password: new FormControl(),
    new_password: new FormControl()
  });

  settingsError: PasswordSettingsError = {
    old_password: [''],
    confirm_password: [''],
    new_password: ['']
  }

  constructor(
    private _settingsService: SettingsService
  ){ }

  ngOnInit(){ }

  submitForm() {
    console.log("Password DATA SUBMITTED!!");
    // console.log(this.settingsForm.value);

    let settings: PasswordSettings = {
      old_password: this.settingsForm.value["old_password"],
      confirm_password: this.settingsForm.value["confirm_password"],
      new_password: this.settingsForm.value["new_password"]
    }

    this._settingsService.updatePassword(settings).subscribe(
      (data: DefaultResponse) => {
        alert("Password Updated.");
        this.isSuccessful = false;
        this.isFailed = false;
        this.errorMessage = '';

        this.settingsError = {
          old_password: [''],
          confirm_password: [''],
          new_password: ['']
        }

      },
      (error: any)=>{
        
        console.log(error);
        if (error.status == 400) {
          this.settingsError = error.error;
        }        

        this.isFailed = true;
        this.isSuccessful = false;
        alert("Updating Password Failed.");
      }
    )
  }
}
