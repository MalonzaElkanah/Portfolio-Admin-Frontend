import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Article, ArticleList } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent  implements OnInit {
  articles: ArticleList | undefined;

  search_keyword = '';
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private _blogService: BlogService
  ) { }

  ngOnInit(){
    this._blogService.getArticleList().subscribe((articles: ArticleList)=>{
      this.articles = articles;
    });
  }

  searchArticles(search: string): void {
    this.search_keyword = search;
    this._blogService.getArticleList(search).subscribe((articles: ArticleList) => {
      this.articles = articles;
    });
  }

  pageArticles(page: string) {
    this._blogService.getArticleList(
      this.search_keyword,
      page
    ).subscribe((articles: ArticleList) => {
      this.articles = articles;
    });
  }

  removeArticle(article: Article){
    let deleteConfirm = confirm("DELETE '"+article.title+"' post? Click OK to confirm.");
    if (deleteConfirm) {
      this._blogService.deleteArticle(article?.id ?? 0).subscribe(() => {

        alert("Delete '"+article.title+"' Success!");
        console.log("Delete '"+article.title+"' Success!");
        this._blogService.getArticleList().subscribe((articles: ArticleList)=>{
          this.articles = articles;
        });
      },(error: any) => {
        console.log("Delete '"+article.title+"' Failed");
        console.log(error);
        alert("Delete '"+article.title+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+article.title+"' Canceled!");
    }
  }

  getStatusBadge(status: string) {
    if (status === "Publish") {
      return "bg-primary"
    } else if (status === "Pending") {
      return "bg-warning"
    } else if (status === "Draft") {
      return "bg-secondary"
    } else if (status === "Trash") {
      return "bg-danger"
    } else {
      return "bg-secondary"
    }
  }


  slugify(str: string): string {
    return str.toLowerCase(
      ).trim(
      ).replace(
        /[^\w\s-]/g,
        ''
      ).replace(
        /[\s_-]+/g,
        '-'
      ).replace(
        /^-+|-+$/g,
        ''
      );
  }

  binarify(int: number): string {
    return btoa(int.toString())
  }

}
