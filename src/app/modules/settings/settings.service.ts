import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
    AppSettings,
    EmailSettings,
    PasswordSettings,
    ImageUploadResponse,
    DefaultResponse,
    AppSettingsError,
    EmailSettingsError,
    PasswordSettingsError
} from './settings';
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
export class SettingsService {

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

    getAppSettings() {
        let url = endpoint+"app-settings/1/";
        return this.http.get<AppSettings>(url, httpOptions).pipe(catchError(this.handleError));
    }

    updateAppSettings(data: AppSettings) {
        let url = endpoint+"app-settings/1/";
        return this.http.patch<AppSettings | AppSettingsError | any>(url,data, httpOptions);
    }

    getEmailSettings(){
        let url = endpoint+"profile/1/email-settings/1/";
        return this.http.get<EmailSettings>(url, httpOptions).pipe(catchError(this.handleError));
    }

    updateEmailSettings(data: EmailSettings) {
        let url = endpoint+"profile/1/email-settings/1/";
        return this.http.patch<EmailSettings | EmailSettingsError | any>(url,data, httpOptions);
    }

    updatePassword(data: PasswordSettings) {
        let url = endpoint+"change-password";
        return this.http.put<DefaultResponse | any | PasswordSettingsError>(url, data, httpOptions);
    }

    uploadImage(formData: FormData) {
        return this.http.post<ImageUploadResponse | any>(
          `${endpoint}upload-image/`,
          formData
        )
    }
}
