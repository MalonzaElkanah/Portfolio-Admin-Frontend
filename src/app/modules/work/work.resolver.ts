import { ResolveFn, ActivatedRouteSnapshot, Router  } from '@angular/router';
import {inject} from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Work } from './work';
import { WorkService } from './work.service';

export const workResolver: ResolveFn<Work> = (route, state) => {
    const router = inject(Router);
    const workService = inject(WorkService);

    const routeId = route.paramMap.get('id')!;
    const workId = parseInt(atob(routeId), 10);

    return workService.getWork(workId).pipe(mergeMap(work => {
        if (work) {
            return of(work);
        } else {  // work not found
            router.navigate(['/work']);
            return EMPTY;
        }
    }));
};
