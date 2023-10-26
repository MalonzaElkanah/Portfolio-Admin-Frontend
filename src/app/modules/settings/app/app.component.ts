import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

import {
    AppSettings,
    ImageUploadResponse,
    AppSettingsError
} from '../settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  settings!: AppSettings;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  logoImage = "";
  logoUpload = "";
  faviconImage = "";
  faviconUpload = "";

  settingsForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  settingsError: AppSettingsError = {
    app_name: [''],
    logo: [''],
    favicon: ['']
  }

  constructor(
    private _settingsService: SettingsService
  ){

    this._settingsService.getAppSettings().subscribe((data: AppSettings) => {
      this.settings = data;

      this.logoImage = this.settings.logo;
      this.faviconImage = this.settings.favicon;

      this.settingsForm = new FormRecord({
        app_name: new FormControl(this.settings.app_name),
        logo: new FormControl(this.settings.logo),
        favicon: new FormControl(this.settings.favicon)
      });
    });

  }

  ngOnInit(){ }

  uploadLogo(event: any){
    console.log("Logo UPLOAD");
    console.log(event?.target); // event?.target.files
    let file:File = event?.target?.files[0];

    if (file) {
      let fileName = file.name;
      let formData = new FormData();

      formData.append("image", file);

      this.logoUpload = "Uploading Image..."

      this._settingsService.uploadImage(formData).subscribe(
        (data: ImageUploadResponse) => {
          this.logoUpload = "Uploaded: "+data.path;
          this.logoImage = data.path;
        },
        (error: any) => {
          console.log(error);
          this.logoUpload = "Error: Upoad Failed!";
          if (error.status == 400) {
            this.isFailed = true;
            this.settingsError.logo = error.error?.image ?? "";
          }
        }
      );

    }
  }

  uploadFavicon(event: any){
    console.log("Favicon UPLOAD");
    console.log(event?.target); // event?.target.files
    let file:File = event?.target?.files[0];

    if (file) {
      let fileName = file.name;
      let formData = new FormData();

      formData.append("image", file);

      this.logoUpload = "Uploading Icon..."

      this._settingsService.uploadImage(formData).subscribe(
        (data: ImageUploadResponse) => {
          this.faviconUpload = "Uploaded: "+data.path;
          this.faviconImage = data.path;
        },
        (error: any) => {
          console.log(error);
          this.faviconImage = "Error: Upoad Failed!";
          if (error.status == 400) {
            this.isFailed = true;
            this.settingsError.logo = error.error?.image ?? "";
          }
        }
      );

    }
  }

  submitForm() {
    console.log("settings DATA SUBMITTED!!");
    console.log(this.settingsForm.value);

    let settings: AppSettings = {
      app_name: this.settingsForm.value["app_name"],
      logo: this.logoImage,
      favicon: this.faviconImage
    }

    this._settingsService.updateAppSettings(settings).subscribe((settings: AppSettings) => {
      alert("Settings Added!");

      this.isSuccessful = false;
      this.isFailed = false;

      this.settingsError = {
        app_name: [''],
        logo: [''],
        favicon: ['']
      }
    },
    (error:any)=>{
      
      console.log(error);
      if (error.status == 400) {
        this.settingsError = error.error;
      }        
      // this.errorMessage = err.error.message;
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Updated Failed");
    })
  }

}
