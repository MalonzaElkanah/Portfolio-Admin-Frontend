import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Letter } from '../jobs';
import { JobsService } from '../jobs.service';

export const lettersResolver: ResolveFn<Letter> = (route, state) => {
    const router = inject(Router);
    const _jobService = inject(JobsService);

    const routeId = route.paramMap.get('id')!;
    const letterId = parseInt(atob(routeId), 10);

    return _jobService.getLetter(letterId).pipe(mergeMap(letter => {
        if (letter) {
            return of(letter);
        } else {
            router.navigate(['/letters']);
            return EMPTY;
        }
    }));
};
