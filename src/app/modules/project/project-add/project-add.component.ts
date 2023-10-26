import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ProjectService } from '../project.service';
import { Project, ProjectError, ImageUploadResponse } from '../project';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  config = {
    uploadImagePath: environment.APIEndpoint+'upload-image/' // API URL to upload image
  }

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  selectedItems!:any;

  projectImage = "";
  imageUpload = "No Image Uploaded";

  projectForm: FormRecord =  new FormRecord({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    video_url: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    keywords: new FormControl()

    //keywords: new FormArray([
    //  new FormGroup({
    //    technology: new FormControl('')
    //  })
    //])

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
    private _router: Router
  ) { }

  ngOnInit(){ }

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

    this._projectSevice.createProject(project).subscribe((project: Project) => {
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
