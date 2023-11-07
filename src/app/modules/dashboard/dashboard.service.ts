import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { 
    ActivityLog,
    ActivityLogList,
    VisitorCount,
    VisitorCountList,
    VisitorStat
} from './dashboard';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

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
export class DashboardService {

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

    getActivityLogs(search?: string, page?: string){
        let url = `${endpoint}activity-logs/`;

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
        return this.http.get<ActivityLogList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getDailyVisitorCount(search?: string, page?: string){
        let url = `${endpoint}visitors/daily/`;

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
        return this.http.get<VisitorCountList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getWeeklyVisitorCount(search?: string, page?: string){
        let url = `${endpoint}visitors/weekly/`;

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
        return this.http.get<VisitorCountList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getMonthlyVisitorCount(search?: string, page?: string){
        let url = `${endpoint}visitors/monthly/`;

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
        return this.http.get<VisitorCountList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getYearlyVisitorCount(search?: string, page?: string){
        let url = `${endpoint}visitors/yearly/`;

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
        return this.http.get<VisitorCountList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getVisitorStats(){
        return this.http.get<VisitorStat>(
            `${endpoint}visitors/stats/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

}
