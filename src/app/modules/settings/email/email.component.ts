import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

import {
    EmailSettings,
    ImageUploadResponse,
    EmailSettingsError
} from '../settings';
import { SettingsService } from '../settings.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  settings!: EmailSettings;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  settingsForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  settingsError: EmailSettingsError = {
    smtp_server: [''],
    port: [''],
    email: [''],
    password: ['']
  }

  constructor(
    private _settingsService: SettingsService
  ){

    this._settingsService.getEmailSettings().subscribe((data: EmailSettings) => {
      this.settings = data;

      this.settingsForm = new FormRecord({
        email: new FormControl(this.settings.email),
        port: new FormControl(this.settings.port),
        smtp_server: new FormControl(this.settings.smtp_server),
        password: new FormControl(this.settings.password)
      });
    });

  }

  ngOnInit(){ }

  submitForm() {
    console.log("Email Configurations DATA SUBMITTED!!");
    // console.log(this.settingsForm.value);

    let settings: EmailSettings = {
      email: this.settingsForm.value["email"],
      password: this.settingsForm.value["password"],
      smtp_server: this.settingsForm.value["smtp_server"],
      port: this.settingsForm.value["port"]
    }

    this._settingsService.updateEmailSettings(settings).subscribe(
      (settings: EmailSettings) => {
        alert("Settings Updated.");
        this.isSuccessful = false;
        this.isFailed = false;
        this.errorMessage = '';

        this.settingsError = {
          smtp_server: [''],
          port: [''],
          email: [''],
          password: ['']
        }

      },
      (error:any)=>{
        
        console.log(error);
        if (error.status == 400) {
          this.settingsError = error.error;
        }        

        this.isFailed = true;
        this.isSuccessful = false;
        alert("Updating EmailConfigs Failed.");
      }
    )
  }
}
