import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from 'src/app/core/loader/loader.service';
import { environment } from 'src/environments/environment';

const endpoint = environment.APIEndpoint;

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private _totalRequests = 0;

  constructor(private _loadingService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(endpoint)) {
      console.log('Intercept to create loader..')

      this._totalRequests++;
      this._loadingService.setLoading(true);
      return next.handle(request).pipe(
        finalize(() => {
          this._totalRequests--;

          if (this._totalRequests == 0) {
            this._loadingService.setLoading(false);
          }
        })
      );
    } else {
      return next.handle(request);
    }

  }
}
