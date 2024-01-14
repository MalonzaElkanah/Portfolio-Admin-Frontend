import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

declare var $: any; // import * as $ from 'jquery';

import {
  Article,
  ArticleError,
  ImageUploadResponse,
  Series,
  SeriesList,
  Category,
  CategoryList
} from '../blog';
import { BlogService } from '../blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit, AfterViewInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  seriesList: SeriesList | undefined;
  categoryList: CategoryList | undefined;

  selectedItems!:any;
  selectedSeries!:any;
  selectedCategory!:any;

  articleImage = "";
  imageUpload = "No Image Uploaded";

  $summernote!:any;
  config!: any;

  articleForm: FormRecord =  new FormRecord({
    image: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    category: new FormControl(),
    series: new FormControl(),
    tags: new FormControl()

  });

  articleError: ArticleError = {
    image: [''],
    title: [''],
    content: [''],
    status: [''],
    category: [''],
    series: [''],
    tags: ['']
  }

  constructor(
    private _blogService: BlogService,
    private _router: Router
  ) {  }

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

          let img = file[0]; //document.createElement('img');
          // img.src = file; // data.path;
          img.className = "img-fluid";
          console.log(img);
          this.$summernote?.summernote('insertNode', img);
          /*if (file) {
            let fileName = file?.name;
            let formData = new FormData();

            formData.append("image", file);

            this._blogService.uploadImage(formData).subscribe(
              (data: ImageUploadResponse) => {
                // this.articleImage = data.path;
                let img = document.createElement('img');
                img.src = data.path;
                img.className = "img-fluid";
                console.log(img);
                this.$summernote?.summernote('insertNode', img);
              },
              (error: any) => {
                console.log(error);
              }
            );
          } **/

        },
        onImageUploadError: (file: any) => {
          console.log(file);
          let img = file[0];
          img.className = "img-fluid";
          console.log(img);
          this.$summernote?.summernote('insertNode', img);

          console.log("Upload Image Failed.");
          // alert("Upload Image Failed.");
        }
      }
    }

    this._blogService.getSeriesList().subscribe((series: SeriesList)=> {
      this.seriesList = series;
    });

    this._blogService.getCategoryList().subscribe((categories: CategoryList)=> {
      this.categoryList = categories;
    });

    // this.$summernote = $("#summernote");
    // console.log(this.$summernote);

    /*$("ngxSummernote").on('summernote.image.link.insert', function(we, url){
      // url is the image url from the dialog
      let $img = $('<img>').attr({ src: url });
      console.log("url is the image url from the dialog");
      // $summernote = $("ngxSummernote");
      // $summernote.summernote('insertNode', $img[0]);
    });*/

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

  addSeries(name: string) {
    let series: Series = { name: name };

    /*this._blogService.createSeries(series).subscribe((series: Series) => {
      // this._blogService.getSeriesList().subscribe((series: SeriesList)=> {
      //   this.seriesList = series;
      // });
      alert("Series Added.");
      return series;
    },
    (error:any)=>{
      console.log(error);
      if (error.status == 400) {
        this.articleError.series = error.error.name;
      }        
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Creating Series Failed");

      return null;
    })*/
    return series;
  }

  addCategory(name: string) {
    let category: Category = { name: name };

    /*this._blogService.createCategory(category).subscribe((category: Category) => {
      // this._blogService.getCategoryList().subscribe((categories: CategoryList)=> {
      //   this.categoryList = categories;
      // });
      alert("Category Added.");
      return category;
    },
    (error:any)=>{
      console.log(error);
      if (error.status == 400) {
        this.articleError.category = error.error.name;
      }        
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Creating category Failed");

      return null;
    })*/
    return category;
  }

  addTagFn(name: string) {
    return name;
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

      this._blogService.uploadImage(formData).subscribe(
        (data: ImageUploadResponse) => {
          this.imageUpload = "Uploaded: "+data.path;
          this.articleImage = data.path;
        },
        (error: any) => {
          console.log(error);
          this.imageUpload = "Error: Upoad Failed!";
          if (error.status == 400) {
            this.isFailed = true;
            this.articleError = error.error;
          }
        }
      );

    }
  }

  submitArticleForm() {
    console.log("POST DATA SUBMITTED!!");
    console.log(this.selectedItems);
    console.log(this.articleForm.value);

    let article: Article = {
      title: this.articleForm.value["title"],
      image: this.articleImage,
      category: this.articleForm.value["category"],
      series: this.articleForm.value["series"],
      content: this.articleForm.value["content"],
      tags: this.articleForm.value["tags"].join(","),
      status: this.articleForm.value["status"]
    }
    console.log(article);

    this._blogService.createArticle(article).subscribe((article: Article) => {
      alert("Article Added");
      
      // Get article ID
      // let _slug = this._blogService.slugify(project.name)
      // let _id = this._blogService.binarify(project?.id!)
      // Redirect to article view
      this._router.navigate([`/blog/articles`]);

    },
    (error:any)=>{
      
      console.log(error);
      if (error.status == 400) {
        this.articleError = error.error;
      }        
      // this.errorMessage = err.error.message;
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Creating Post Failed");
    });

  }

}
