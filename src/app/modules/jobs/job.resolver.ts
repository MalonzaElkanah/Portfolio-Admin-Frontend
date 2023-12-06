import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Job } from './jobs';
import { JobsService } from './jobs.service';

export const jobResolver: ResolveFn<Job> = (route, state) => {
    const router = inject(Router);
    const _jobService = inject(JobsService);

    const routeId = route.paramMap.get('id')!;
    const jobId = parseInt(atob(routeId), 10);

    return _jobService.getJob(jobId).pipe(mergeMap(job => {
        if (job) {
            return of(job);
        } else {
            router.navigate(['/jobs']);
            return EMPTY;
        }
    }));
};
