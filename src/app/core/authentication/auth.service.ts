import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services';

const endpoint = environment.APIEndpoint;
// const clientId = environment.APIClientID;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    private _route: Router,
    private _storageService: StorageService,
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {}

  isLoggedIn(): boolean {
    //check if the user is logged in using an api generated token
    console.log(`CHEKING LOGGED IN`);

    const tokenItems = JSON.parse(
      this._storageService.getItem('token') || '{}'
    );

    const token = tokenItems !== null ? tokenItems.token : null;

    if (token != null && token != undefined) {
      console.log("LOGGED !")

      return true;
    }

    console.log("NOT LOGGED !")

    return false;
  }

  signIn(data: any) {
    const rememberMe = data.remember_me;

    if (rememberMe) {
      this._cookieService.set('rememberMe', rememberMe);
      this._storageService.setItem('rememberMe', rememberMe);
    }

    return this._http.post<any>(endpoint + 'auth/token/', data).pipe(
      switchMap(res => {
        const token = res.access;
        // const tokenExpiry = res.expires_in;
        const tokenRefresh = res.refresh;
        let tokenItems;

        tokenItems = { token, tokenRefresh };

        if (rememberMe) {
          const loggedInTime = Date.now();
          const refreshTokenTime = Math.max(loggedInTime + 3600000, 3600000);
          // const refreshTokenTime = loggedInTime + 2000;
          tokenItems = { token, tokenRefresh, refreshTokenTime };
        }
       
        // localStorage.setItem('token', JSON.stringify(tokenItems));
        this._storageService.setItem('token', JSON.stringify(tokenItems));

        return this.userProfile();
      }),
      concatMap(() => {
        return this._route.navigate(['/home']);
      })
    );
  }

  refreshToken(data: any) {

    return this._http.post<any>(`${endpoint}auth/token/refresh/`, data).pipe(
      map(res => {
        const token = res.access;
        const tokenRefresh = data.refresh;

        let tokenItems;
        tokenItems = { token, tokenRefresh };

        const rememberMe = this._cookieService.get('rememberMe') || this._storageService.getItem('rememberMe');
        // localStorage.getItem('rememberMe');
          
        if (rememberMe) {
          const refreshTokenInitialTime = Date.now();
          const refreshTokenTime = Math.max(
            refreshTokenInitialTime + 3600000,
            3600000
          );
          tokenItems = { token, tokenRefresh, refreshTokenTime };
        }

        //localStorage.setItem('token', JSON.stringify(tokenItems));
        this._storageService.setItem('token', JSON.stringify(tokenItems));
      })
    );
  }

  userProfile(): Observable<any> {
    return this._http.get<any>(`${endpoint}profile/me/`).pipe(
      map(res => {
        console.log('THE USER PROFILE', res);
        this._storageService.setItem('userDetails', JSON.stringify(res));
        return res;
      })
    );
  }

  signOut() {
    localStorage.clear();
    sessionStorage.clear();
    this._cookieService.delete('rememberMe');
    this._route.navigate(['/sign-in']);
  }

  toggleShowPassword(type: any) {
    type === 'password' ? type = 'text' : type = 'password';
    return type;
  }

  getUserProfile() {
    // this._storageService.watchStorage().subscribe((data:string) => {
    //this.user = JSON.parse(localStorage.getItem('userDetails'));
    this.user = JSON.parse(this._storageService.getItem('userDetails') || '{}');

    if (this.user !== '{}' || this !== null) {
      return this.user;
    }
    return;
  }

}
