import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import {inject} from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Education } from './education';
import { EducationService } from './education.service';

export const educationResolver: ResolveFn<Education> = (route, state) => {
    const router = inject(Router);
    const educationService = inject(EducationService);

    const routeId = route.paramMap.get('id')!;
    const educationId = parseInt(atob(routeId), 10);

    return educationService.getEducation(educationId).pipe(mergeMap(education => {
        if (education) {
            return of(education);
        } else {  // education not found
            router.navigate(['/education']);
            return EMPTY;
        }
    }));
};
