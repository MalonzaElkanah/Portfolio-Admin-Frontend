import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormRecord, FormArray } from '@angular/forms';

import { Profile, SocialLink, ProfileError, SocialLinkList } from '../profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profile!: Profile;
  // social_links!: [SocialLink];
  cv_file: any;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  profileForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });
  socialLinkForm: FormArray = new FormArray([
    new FormRecord({
      name: new FormControl(''),
      logo: new FormControl(''),
      url: new FormControl('')
    })
  ]);

  profileError: ProfileError = {
    image: [''],
    first_name: [''],
    second_name: [''],
    description: [''],
    cv_file: [''],
    email_1: [''],
    email_2: [''],
    address: [''],
    phone_number_1: [''],
    phone_number_2: ['']
  }

  constructor(
    private _route: ActivatedRoute,
    private _profileService: ProfileService,
    private _formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer
  ) {
    this._route.data.subscribe(data => {
      this.profile = data['profile'];
    });

  }

  ngOnInit() {

    if (this.profile?.social_links) {
      let social_links = this.profile.social_links;

      this.socialLinkForm.removeAt(0);

      for (let social of social_links) {
        this.socialLinkForm.push(
          new FormRecord({
            name: new FormControl(social.name ?? ''),
            logo: new FormControl(social.logo ?? ''),
            url: new FormControl(social.url ?? '')
          })
        );
      }

    }

    this.profileForm = new FormRecord ({
      image: new FormControl(this.profile?.image),
      first_name: new FormControl(this.profile.first_name),
      second_name: new FormControl(this.profile.second_name),
      description: new FormControl(this.profile?.description),
      cv_file: new FormControl(this.profile?.cv_file),
      email_1: new FormControl(this.profile.email_1),
      email_2: new FormControl(this.profile.email_2),
      address: new FormControl(this.profile.address),
      phone_number_1: new FormControl(this.profile.phone_number_1),
      phone_number_2: new FormControl(this.profile?.phone_number_2),

      social_links: this.socialLinkForm
    });

  }

  getSocialLinkFormRecord(index: number) {
    let formArray = this.profileForm.get("social_links") as FormArray;
    return formArray.at(index) as FormRecord;
  }

  addSocialLinkFormRecord() {
    let newFormRecord = new FormRecord({
      name: new FormControl(''),
      logo: new FormControl(''),
      url: new FormControl('')
    })
    // let formArray = this.profileForm.get("social_links") as FormArray;

    this.socialLinkForm.push(newFormRecord);
    // formArray.push(newFormRecord);
    // this.profileForm.patchValue(social_links: formArray)
  }

  deleteSocialLinkFormRecord(index: number) {
    let social_links = this.profile.social_links;
    let formArray = this.profileForm.get("social_links") as FormArray;

    if (social_links) {
      if (index < social_links.length ?? index ) {
      
        let name = social_links[index]?.name ?? '';

        this._profileService.deleteSocialLink(social_links[index]?.id ?? 0).subscribe(()=>{
          formArray.removeAt(index);

          alert("SocialLink'"+name+" ' Deleted");

          },
          err =>{
            console.log(err);

            alert("Delete Failed");
          } 
        );

        this._profileService.getSocialLinks().subscribe((socialLinks: SocialLinkList) => {
          if (socialLinks?.results){
            this.profile.social_links = socialLinks.results
          }
        });
      } else {
      formArray.removeAt(index);
      alert("SocialLink Deleted");
    }
    } else {
      formArray.removeAt(index);
      alert("SocialLink Deleted");
    }
    
  }

  submitProfileForm() {
    console.log("PROFILE DATA SUBMITTED!!");
    console.log(this.profileForm.value);

    let profile: Profile = {
      // image: this.profileForm.value["image"] ?? '',
      first_name: this.profileForm.value["first_name"] ?? '',
      second_name: this.profileForm.value["second_name"] ?? '',
      description: this.profileForm.value["description"] ?? '',
      // cv_file: this.profileForm.value["cv_file"] ?? '',
      email_1: this.profileForm.value["email_1"] ?? '',
      email_2: this.profileForm.value["email_2"] ?? '',
      address: this.profileForm.value["address"] ?? '',
      phone_number_1: this.profileForm.value["phone_number_1"] ?? '',
      phone_number_2: this.profileForm.value["phone_number_2"] ?? '',
      social_links: this.profileForm.value["social_links"] ?? []
    }

    this._profileService.updateProfile(profile).subscribe(
      data => {
        this.profile = data;
        this.isSuccessful = true;
        this.isFailed = false;
        alert("Profile Updated!");
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          this.profileError = err.error;
        }        
        // this.errorMessage = err.error.message;
        this.isFailed = true;
        this.isSuccessful = false;
        alert("Updated Failed");
      }

    )

  }

}
