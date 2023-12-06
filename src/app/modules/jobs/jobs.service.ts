import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { 
    JobSite,
    Job,
    JobList,
    JobSiteList,
    JobSiteError,
    Letter,
    LetterList,
    LetterError,
    JobApplication,
    JobApplicationList,
    JobApplicationError
} from './jobs';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const JOB_API = endpoint+'jobs/'
const SITE_API = endpoint+'job-sites/'
const LETTER_API = endpoint+'letters/'
const APPLICATION_API = endpoint+'job-applications/'

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
export class JobsService {

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

    getJobSites(search?: string, page?: string){
        let url = SITE_API;

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

        return this.http.get<JobSiteList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createJobSite(data: JobSite) {
        return this.http.post<JobSite | JobSiteError | any>(
            `${SITE_API}`, data, httpOptions
        );
    }

    getJobSite(id: number){
        return this.http.get<JobSite>(
            `${SITE_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateJobSite(id: number, data: JobSite) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<JobSite | JobSiteError | any>(
            `${SITE_API}${id}/`, data, httpOptions
        );
    }

    deleteJobSite(id: number){
        return this.http.delete<any>(
            `${SITE_API}${id}/`,
            httpOptions
        );
    }

    getJobSiteJobs(id: number){
        let url = `${SITE_API}${id}/jobs/`;

        return this.http.get<Job[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    scrapJobSite(id: number){
        let url = `${SITE_API}${id}/scrap/`;

        return this.http.post<Job[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getJobs(id: number){
        let url = `${JOB_API}`;
        return this.http.get<JobList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getJob(id: number){
        let url = `${JOB_API}${id}/`;
        return this.http.get<Job>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getRenderedJobLetter(job_id: number, letter_id: number){
        let url = `${JOB_API}${job_id}/render-letter/${letter_id}/`;
        return this.http.get<Job>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteJob(id: number){
        let url = `${JOB_API}${id}/`;
        return this.http.delete<any>(url, httpOptions);
    }

    getJobApplications(id: number){
        let url = `${JOB_API}${id}/applications/`;
        return this.http.get<JobApplication[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getLetters(search?: string, page = 1){
        let url = LETTER_API;

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

        return this.http.get<LetterList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createLetter(data: Letter) {
        return this.http.post<Letter | LetterError | any>(
            `${LETTER_API}`, data, httpOptions
        );
    }

    getLetter(id: number){
        return this.http.get<Letter>(
            `${LETTER_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateLetter(id: number, data: Letter) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Letter | LetterError | any>(
            `${LETTER_API}${id}/`, data, httpOptions
        );
    }

    deleteLetter(id: number){
        return this.http.delete<any>(
            `${LETTER_API}${id}/`,
            httpOptions
        );
    }

    getApplications(search?: string, page = 1){
        let url = APPLICATION_API;

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

        return this.http.get<JobApplication[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createApplication(data: JobApplication) {
        return this.http.post<JobApplication | JobApplicationError | any>(
            `${APPLICATION_API}`, data, httpOptions
        );
    }

    getApplication(id: number){
        return this.http.get<JobApplication>(
            `${APPLICATION_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateApplication(id: number, data: JobApplication) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<JobApplication | JobApplicationError | any>(
            `${APPLICATION_API}${id}/`, data, httpOptions
        );
    }

    deleteApplication(id: number){
        return this.http.delete<any>(
            `${APPLICATION_API}${id}/`,
            httpOptions
        );
    }

}
