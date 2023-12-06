import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { JobSite } from './jobs';
import { JobsService } from './jobs.service';

export const jobsResolver: ResolveFn<JobSite> = (route, state) => {
    const router = inject(Router);
    const _jobService = inject(JobsService);

    const routeId = route.paramMap.get('id')!;
    const jobSiteId = parseInt(atob(routeId), 10);

    return _jobService.getJobSite(jobSiteId).pipe(mergeMap(site => {
        if (site) {
            return of(site);
        } else {  // pricing not found
            router.navigate(['/jobs']);
            return EMPTY;
        }
    }));
};
