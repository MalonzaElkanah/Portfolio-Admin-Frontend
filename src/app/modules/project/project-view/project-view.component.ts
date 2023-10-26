import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  project!: Project;
  description: any = "";

  constructor(
    private _projectSevice: ProjectService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ){ }

  ngOnInit(){
    this._route.data.subscribe((data) => {
      this.project = data["project"];

      if(this.project.description) {
        // Trust File
        // this.description = this._sanitizer.bypassSecurityTrustResourceUrl(this.project.description);
      }

    });

  }
}
