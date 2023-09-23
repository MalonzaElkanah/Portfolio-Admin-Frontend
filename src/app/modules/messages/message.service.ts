import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Message, MessageList } from './message';
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
export class MessageService {

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

    getAllMessages(){
        return this.http.get<MessageList>(
            `${endpoint}messages/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    getMessage(id: number){
        return this.http.get<Message>(
            `${endpoint}messages/${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }
}
