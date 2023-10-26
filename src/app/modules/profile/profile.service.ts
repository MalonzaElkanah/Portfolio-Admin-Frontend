import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { 
    Profile,
    SocialLink,
    SocialLinkList,
    ProfileError,
    UploadResponse
} from './profile';
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
export class ProfileService {

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

    getProfile(){
        return this.http.get<Profile>(
            `${endpoint}profile/1/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateProfile(data: Profile) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Profile | ProfileError | any>(
            `${endpoint}profile/1/`, data, httpOptions
        );
    }

    getSocialLinks(){
        return this.http.get<SocialLinkList>(
            `${endpoint}profile/1/social-links/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    deleteSocialLink(id: number) {
        return this.http.delete<any>(
            `${endpoint}profile/1/social-links/${id}/`,
            httpOptions
        )
    }

    uploadImage(formData: FormData) {
        return this.http.post<UploadResponse | any>(
          `${endpoint}upload-image/`,
          formData
        )
    }

    uploadFile(formData: FormData) {
        return this.http.post<UploadResponse | any>(
          `${endpoint}upload-file/`,
          formData
        )
    }
}
