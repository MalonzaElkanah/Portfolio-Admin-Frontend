import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../profile';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  profile!: Profile;
  cv_file: any;

  constructor(
    private _route: ActivatedRoute,
    private _profileService: ProfileService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this._route.data.subscribe((data) => {
      this.profile = data["profile"];

      if(this.profile.cv_file ) {
        // Remove &export=download to stop file to download
        let cv_file = this.profile.cv_file.replace("&export=download", "")
        // Trust File

        this.cv_file = this._sanitizer.bypassSecurityTrustResourceUrl(cv_file);
      }

    });
  }

}
