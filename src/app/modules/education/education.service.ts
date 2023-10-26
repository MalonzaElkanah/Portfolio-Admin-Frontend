import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
    Education,
    EducationList,
    EducationError
} from './education';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const EDUCATION_API = endpoint+'profile/1/education/'

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
export class EducationService {

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

    getEducationList(search?: string, page = 1){
        let url = EDUCATION_API;

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

        return this.http.get<EducationList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createEducation(data: Education) {
        // let json_data = JSON.parse(data); 
        return this.http.post<Education | EducationError | any>(
            `${EDUCATION_API}`, data, httpOptions
        );
    }

    getEducation(id: number){
        return this.http.get<Education>(
            `${EDUCATION_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateEducation(id: number, data: Education) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Education | EducationError | any>(
            `${EDUCATION_API}${id}/`, data, httpOptions
        );
    }

    deleteEducation(id: number){
        return this.http.delete<any>(
            `${EDUCATION_API}${id}/`,
            httpOptions
        );
    }
}
