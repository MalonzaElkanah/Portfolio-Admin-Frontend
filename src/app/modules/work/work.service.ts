import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
    Work,
    WorkList,
    WorkError,
    Highlight,
    HighlightList
} from './work';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const WORK_API = endpoint+'profile/1/work/'

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
export class WorkService {

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

    getWorkList(search?: string, page = 1){
        let url = WORK_API;

        if (page > 1) {
            url = `${url}?page=${page}`;
        }

        if (search) {
            if (page > 1) {
                url = `${url}&?search=${search}`;
            } else {
                url = `${url}?search=${search}`;
            }
        }

        return this.http.get<WorkList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createWork(data: Work) {
        // let json_data = JSON.parse(data); 
        return this.http.post<Work | WorkError | any>(
            `${WORK_API}`, data, httpOptions
        );
    }

    getWork(id: number){
        return this.http.get<Work>(
            `${WORK_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateWork(id: number, data: Work) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Work | WorkError | any>(
            `${WORK_API}${id}/`, data, httpOptions
        );
    }

    deleteWork(id: number){
        return this.http.delete<any>(
            `${WORK_API}${id}/`,
            httpOptions
        );
    }

    getHighlights(id: number){
        return this.http.get<HighlightList>(
            `${WORK_API}${id}/highlights/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    deleteHighlights(work_id: number, id: number) {
        return this.http.delete<any>(
            `${WORK_API}${work_id}/highlights/${id}/`,
            httpOptions
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
