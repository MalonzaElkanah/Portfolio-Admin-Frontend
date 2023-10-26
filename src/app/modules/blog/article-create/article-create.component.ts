import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
export class ArticleCreateComponent implements OnInit {
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

  config = {
    uploadImagePath: environment.APIEndpoint+'upload-image/' // API URL to upload image
  }

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
  ) { }

  ngOnInit(){
    this._blogService.getSeriesList().subscribe((series: SeriesList)=> {
      this.seriesList = series;
    });

    this._blogService.getCategoryList().subscribe((categories: CategoryList)=> {
      this.categoryList = categories;
    });

  }

  addSeries(name: string) {
    let series: Series = { name: name };

    this._blogService.createSeries(series).subscribe((series: Series) => {
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
    })
  }

  addCategory(name: string) {
    let category: Category = { name: name };

    this._blogService.createCategory(category).subscribe((category: Category) => {
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
    })
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
      tags: this.articleForm.value["tags"],
      status: this.articleForm.value["status"]
    }
    console.log(article);
    /*
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
    })

    */
  }

}
