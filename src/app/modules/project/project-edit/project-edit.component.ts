import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";

declare var $: any; // import * as $ from 'jquery';

import { ProjectService } from '../project.service';
import { Project, ProjectError, ImageUploadResponse } from '../project';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, AfterViewInit {
  project!: Project;
  
  $summernote!:any;
  config!: any;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  selectedItems:Array<any> = new Array();
  projectImage = "";
  imageUpload = "No Image Uploaded";

  projectForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  projectError: ProjectError = {
    image: [''],
    name: [''],
    date: [''],
    description: [''],
    url: [''],
    video_url: [''],
    keywords: ['']
  }

  constructor(
    private _projectSevice: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ){

    this._route.data.subscribe((data) => {
      this.project = data["project"];
      // this.selectedItems = this.project?.keywords;
      this.projectImage = this.project.image;

      for (let keyword of this.project.keywords ?? []) {
        this.selectedItems.push(keyword);
      }
    });

  }

  ngOnInit(){
    this.config = {
      uploadImagePath: environment.APIEndpoint+'upload-image/', // API URL to upload image
      callbacks: {
        onImageLinkInsert: (url: string) => {
          // url is the image url from the dialog
          let img = document.createElement('img');
          img.src = url;
          img.className = "img-fluid";
          console.log(img);
          this.$summernote?.summernote('insertNode', img);
        },
        onImageUpload: (file: any) => {
          console.log('File Uploaded');
          console.log(file);

          let img = file[0];
          img.className = "img-fluid";
          console.log(img);
          this.$summernote?.summernote('insertNode', img);
        },
        onImageUploadError: (file: any) => {
          console.log("Upload Image Failed.");
          console.log(file);

          let img = file[0];
          img.className = "img-fluid";
          console.log(img);
          this.$summernote?.summernote('insertNode', img);
        }
      }
    }

    this.projectForm =  new FormRecord({
      image: new FormControl(this.project.image),
      name: new FormControl(this.project.name),
      description: new FormControl(this.project?.description),
      url: new FormControl(this.project?.url),
      video_url: new FormControl(this.project?.video_url),
      date: new FormControl(this.project?.date),
      keywords: new FormControl(this.project?.keywords)
    });
    // this.addTagFn("dummy");
  }

  ngAfterViewInit(){
    setTimeout(
      () => {
        this.$summernote = $("#summernote");
        console.log(this.$summernote);
      }, 
      10000
    );
  }

  addTagFn(technology: string) {
    return { technology: technology };
  }

  uploadFile(event: any){
    console.log("FILE UPLOAD");
    console.log(event?.target); // event?.target.files
    let file:File = event?.target?.files[0];

    if (file) {
      let fileName = file.name;
      let formData = new FormData();

      formData.append("image", file);

      this.imageUpload = "Uploading Image..."

      this._projectSevice.uploadImage(formData).subscribe(
        (data: ImageUploadResponse) => {
          this.imageUpload = "Uploaded: "+data.path;
          this.projectImage = data.path;
        },
        (error: any) => {
          console.log(error);
          this.imageUpload = "Error: Upoad Failed!";
          if (error.status == 400) {
            this.isFailed = true;
            this.projectError = error.error;
          }
        }
      );

      // upload$.subscribe();
    }
  }

  submitProjectForm() {
    console.log("PROJECT DATA SUBMITTED!!");
    console.log(this.selectedItems);
    console.log(this.projectForm.value);

    let project: Project = {
      name: this.projectForm.value["name"],
      image: this.projectImage, // this.projectForm.value["image"],
      date: this.projectForm.value["date"],
      description: this.projectForm.value["description"],
      url: this.projectForm.value["url"],
      video_url: this.projectForm.value["video_url"],
      keywords: this.projectForm.value["keywords"]
    }

    this._projectSevice.updateProject(this.project?.id ?? 0, project).subscribe((project: Project) => {
      alert("Project Added");
      // Get project ID
      let _slug = this._projectSevice.slugify(project.name)
      let _id = this._projectSevice.binarify(project?.id!)
      // Redirect to project view
      this._router.navigate([`/projects/view/${_slug}/${_id}/`]);

    },
    (error:any)=>{
      
      console.log(error);
      if (error.status == 400) {
        this.projectError = error.error;
      }        
      // this.errorMessage = err.error.message;
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Updated Failed");
    })
  }

}
