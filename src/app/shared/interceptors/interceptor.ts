import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { StorageService, ErrorsService } from 'src/app/shared/services';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _route: Router,
    private _errorService: ErrorsService,
    private _storageService: StorageService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenItems = JSON.parse(this._storageService.getItem('token') || '{}') || null;
    const token = tokenItems !== null || tokenItems !== '{}' ? tokenItems.token : null;
    
    console.log("Intercepiting...", token);

    if (token !== null && typeof token !== 'object') {
      let contentType = 'application/json';

      if (request.body instanceof FormData) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }

    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let errorGroup: any = [];

        if (error.error) {
          if (error.error.detail) {
            errorMessage = error.error.detail;
          } else if (error.error.name) {
            errorMessage = error.error.name[0];
          } else if (error.error.error_description) {
            errorMessage = error.error.error_description;
          } else if (error.error.phone) {
            errorMessage = error.error.phone[0];
          } else {
            for (let x in error.error) {
              errorGroup.push(error.error[x]);
            }
            errorMessage = errorGroup.toString();
          }
        }
        
        let errorStatus: any;
        let errorStatusText: string;

        switch (error.status) {
          case 400:
            return next.handle(request)
          case 401:
            errorStatus = error.status;
            errorStatusText = 'Oops! You are unauthorized to view this page';
            console.log('REFRESH TOKEN ERROR:', error);
            
            if (
              error.error.detail ===
              'Given token not valid for any token type'
            ) {
              let params = {
                // token: tokenItems.token,
                refresh: tokenItems.tokenRefresh
              };

              this._authService.refreshToken(params).pipe(take(1)).subscribe(
                () => {
                  const token = JSON.parse(
                    this._storageService.getItem('token') || '{}'
                  ).token;
                    console.log("check---point:.......1")
                  if (token !== null || token !== '{}') {
                    request = request.clone({
                      setHeaders: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    console.log("check---point:.......2")

                    return next.handle(request).pipe(
                      // console.log("check---point:.......3")
                      catchError(err => {
                        if (err.status == 401) {
                          console.error('Refresh Token Issue', err);
                          this._authService.signOut();
                        }

                        return throwError(err);
                      })
                    );
                  } else {
                    this._authService.signOut();
                    return next.handle(request);
                  } 
                }
              );
            } else {
              // Authentication credentials were not provided.
              //logout from account
              this._route.navigate(['/sign-in']);
            }
            break;
          case 403:
            errorStatus = error.status;
            errorStatusText = 'Oops! You are unauthorized to view this page';
            this._errorService.addErrors([errorStatusText]);
            break;
          // case 403:
          //     errorStatus = error.status;
          //     errorStatusText = 'Oops! Media format of the requested data is unsupported';

          //     break;
          case 500:
            if (/DoesNotExist|\/auth\/token/.test(error.error) ) {
                this._route.navigate(['/sign-in']);
            }

            errorStatus = error.status;
            errorStatusText =
              'Oops! You caught us doing some house keeping. Please come back in a few. Sorry for any inconvenience';
            this._errorService.addErrors([errorStatusText]);
            break;
          default:
            errorStatus = 400;
            errorStatusText = `Oops! Seems this page was not found`;
            this._errorService.addErrors([errorStatusText]);
            break;
        }

        return throwError(errorMessage);

      })
    );


  }

}
