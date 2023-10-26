import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
    Article,
    ArticleList,
    ArticleError,
    CategoryList,
    SeriesList,
    Comment,
    CommentList,
    Series,
    Category,
    CategoryError,
    SeriesError,
    ImageUploadResponse
} from './blog';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const BLOG_API = endpoint+'blog/'; // 127.0.0.1:8000/api/v1/blog/articles/

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': endpoint
        // Authorization: 'Bearer '
    })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error
            );
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    constructor(private http: HttpClient) { }

    getArticleList(search?: string, page?: string){
        let url = `${BLOG_API}articles/`;
        console.log("FETCH PAGE: "+page);

        if (page) {
            url = page;
        }

        if (search) {
            if (page) {
                url = `${url}&?search=${search}`;
            } else {
                url = `${url}?search=${search}`;
            }
        }

        return this.http.get<ArticleList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createArticle(data: Article) {
        return this.http.post<Article | ArticleError | any>(
            `${BLOG_API}articles/`, data, httpOptions
        );
    }

    getArticle(id: number){
        return this.http.get<Article>(
            `${BLOG_API}articles/${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateArticle(id: number, data: Article) {
        return this.http.patch<Article | ArticleError | any>(
            `${BLOG_API}articles/${id}/`, data, httpOptions
        );
    }

    deleteArticle(id: number){
        return this.http.delete<any>(
            `${BLOG_API}articles/${id}/`,
            httpOptions
        );
    }

    getCategoryList(search?: string, page = 1){
        let url = `${BLOG_API}categories/`;
        return this.http.get<CategoryList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createCategory(data: Category) {
        return this.http.post<Category | CategoryError | any>(
            `${BLOG_API}categories/`, data, httpOptions
        );
    }

    getSeriesList(search?: string, page = 1){
        let url = `${BLOG_API}series/`;
        return this.http.get<SeriesList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createSeries(data: Series) {
        return this.http.post<Series | SeriesError | any>(
            `${BLOG_API}series/`, data, httpOptions
        );
    }

    getArticleCommentList(id: number) {
        let url = `${BLOG_API}articles/${id}/comments/`;
        return this.http.get<CommentList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteArticleComment(articleId: number, commentId: number) {
        let url = `${BLOG_API}articles/${articleId}/comments/${commentId}/`;
        return this.http.delete<any>(url, httpOptions);
    }

    uploadImage(formData: FormData) {
        return this.http.post<ImageUploadResponse | any>(
          `${endpoint}upload-image/`,
          formData
        )
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
