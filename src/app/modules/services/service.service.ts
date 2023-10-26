import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
    Service,
    ServiceList,
    ServiceError
} from './service';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const SERVICE_API = endpoint+'profile/1/services/'

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
export class ServiceService {

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

    getServiceList(search?: string, page = 1){
        let url = SERVICE_API;

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

        return this.http.get<ServiceList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createService(data: Service) {
        return this.http.post<Service | ServiceError | any>(
            `${SERVICE_API}`, data, httpOptions
        );
    }

    getService(id: number){
        return this.http.get<Service>(
            `${SERVICE_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateService(id: number, data: Service) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Service | ServiceError | any>(
            `${SERVICE_API}${id}/`, data, httpOptions
        );
    }

    deleteService(id: number){
        return this.http.delete<any>(
            `${SERVICE_API}${id}/`,
            httpOptions
        );
    }
}
