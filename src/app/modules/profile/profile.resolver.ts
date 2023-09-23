import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import {inject} from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Profile } from './profile';
import { ProfileService } from './profile.service';

export const profileResolver: ResolveFn<Profile> = (route, state) => {
    const router = inject(Router);
    const profileService = inject(ProfileService);

    return profileService.getProfile().pipe(mergeMap(profile => {
        if (profile) {
            return of(profile);
        } else {  // profile not found
            router.navigate(['/home']);
            return EMPTY;
        }
    }));
};
