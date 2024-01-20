import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

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
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit, AfterViewInit {
  article!: Article;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  seriesList: SeriesList | undefined;
  categoryList: CategoryList | undefined;

  selectedItems:Array<string> = new Array();
  selectedSeries!:any;
  selectedCategory!:any;

  articleImage = "";
  imageUpload = "";

  $summernote!:any;
  config!: any;

  articleForm: FormRecord =  new FormRecord({
    image: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    status: new FormControl(''),
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
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this._route.data.subscribe((data) => {
      this.article = data["article"];
      // this.selectedItems = this.project?.keywords;
      this.articleImage = this.article.image ?? "";
      this.selectedSeries = this.article?.series
      this.selectedCategory = this.article.category

      if (this.article.tags) {
        this.selectedItems = this.article.tags.split(',');
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
        onImageUpload: (files: any) => {
          console.log('File Uploaded');
          console.log(files);

          let img = files[0];
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

    this.articleForm =  new FormRecord({
      image: new FormControl(this.article.image),
      title: new FormControl(this.article.title),
      content: new FormControl(this.article.content),
      status: new FormControl(this.article.status),
      category: new FormControl(this.article.category),
      series: new FormControl(this.article?.series),
      tags: new FormControl(this.article.tags)

    });

    this._blogService.getSeriesList().subscribe((series: SeriesList)=> {
      this.seriesList = series;
    });

    this._blogService.getCategoryList().subscribe((categories: CategoryList)=> {
      this.categoryList = categories;
    });

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
    
    this._blogService.updateArticle(this.article?.id ?? 0, article).subscribe((article: Article) => {
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

