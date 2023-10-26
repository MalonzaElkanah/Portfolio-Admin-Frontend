import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  Keyword,
  KeywordList,
  Pricing,
  PricingList,
  PricingError
} from './prices';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const PRICING_API = endpoint+'profile/1/pricing/'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': endpoint
    })
};


@Injectable({
  providedIn: 'root'
})
export class PricingService {

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

    getPricingList(search?: string, page = 1){
        let url = PRICING_API;

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

        return this.http.get<PricingList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createPricing(data: Pricing) {
        return this.http.post<Pricing | PricingError | any>(
            `${PRICING_API}`, data, httpOptions
        );
    }

    getPricing(id: number){
        return this.http.get<Pricing>(
            `${PRICING_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updatePricing(id: number, data: Pricing) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Pricing | PricingError | any>(
            `${PRICING_API}${id}/`, data, httpOptions
        );
    }

    deletePricing(id: number){
        return this.http.delete<any>(
            `${PRICING_API}${id}/`,
            httpOptions
        );
    }

    // Get Pricing Keywords List

    getPricingKeywordList(pricingId: number){
        let keywordUrl = `${PRICING_API}${pricingId}/keywords/`;
        return this.http.get<KeywordList>(keywordUrl, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    // Delete Pricing Keywords

    deletePricingKeyword(pricingId: number, id: number){
        let keywordUrl = `${PRICING_API}${pricingId}/keywords/${id}/`;
        return this.http.delete<any>(keywordUrl, httpOptions);
    }


}
