import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
    Skill,
    SkillList,
    SkillError,
    SkillKeyword,
    TechnicalSkill,
    ProfessionalSkill,
    TechnicalSkillList,
    ProfessionalSkillList
} from './skill';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

const SKILL_API = endpoint+'profile/1/skills/';
const TECH_SKILL_API = endpoint+'profile/1/technical-skills/';
const PROF_SKILL_API = endpoint+'profile/1/professional-skills/';

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
export class SkillService {
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

    getSkillList(search?: string, page = 1){
        let url = SKILL_API;

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

        return this.http.get<SkillList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createSkill(data: Skill) {
        // let json_data = JSON.parse(data); 
        return this.http.post<Skill | SkillError | any>(
            `${SKILL_API}`, data, httpOptions
        );
    }

    getSkill(id: number){
        return this.http.get<Skill>(
            `${SKILL_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateSkill(id: number, data: Skill) {
        // let json_data = JSON.parse(data); 
        return this.http.patch<Skill | SkillError | any>(
            `${SKILL_API}${id}/`, data, httpOptions
        );
    }

    deleteSkill(id: number){
        return this.http.delete<any>(
            `${SKILL_API}${id}/`,
            httpOptions
        );
    }


    // Technical Skills
    getTechSkillList(search?: string, page = 1){
        let url = TECH_SKILL_API;

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

        return this.http.get<TechnicalSkillList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createTechSkill(data: TechnicalSkill) { 
        return this.http.post<TechnicalSkill | any>(
            `${TECH_SKILL_API}`, data, httpOptions
        );
    }

    getTechSkill(id: number){
        return this.http.get<TechnicalSkill>(
            `${TECH_SKILL_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateTechSkill(id: number, data: TechnicalSkill) {
        return this.http.patch<TechnicalSkill | any>(
            `${TECH_SKILL_API}${id}/`, data, httpOptions
        );
    }

    deleteTechSkill(id: number){
        return this.http.delete<any>(
            `${TECH_SKILL_API}${id}/`,
            httpOptions
        );
    }

    // Professional Skills
    getProfSkillList(search?: string, page = 1){
        let url = PROF_SKILL_API;

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

        return this.http.get<ProfessionalSkillList>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    createProfSkill(data: ProfessionalSkill) { 
        return this.http.post<ProfessionalSkill | any>(
            `${PROF_SKILL_API}`, data, httpOptions
        );
    }

    getProfSkill(id: number){
        return this.http.get<ProfessionalSkill>(
            `${PROF_SKILL_API}${id}/`,
            httpOptions
        ).pipe(
            catchError(this.handleError)
        );
    }

    updateProfSkill(id: number, data: ProfessionalSkill) {
        return this.http.patch<ProfessionalSkill | any>(
            `${PROF_SKILL_API}${id}/`, data, httpOptions
        );
    }

    deleteProfSkill(id: number){
        return this.http.delete<any>(
            `${PROF_SKILL_API}${id}/`,
            httpOptions
        );
    }

}
