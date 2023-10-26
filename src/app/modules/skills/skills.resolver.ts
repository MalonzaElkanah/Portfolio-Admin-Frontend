import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Skill } from './skill';
import { SkillService } from './skill.service';


export const skillsResolver: ResolveFn<Skill> = (route, state) => {
    const router = inject(Router);
    const skillService = inject(SkillService);

    const routeId = route.paramMap.get('id')!;
    const skillId = parseInt(atob(routeId), 10);

    return skillService.getSkill(skillId).pipe(mergeMap(skill => {
        if (skill) {
            return of(skill);
        } else {  // profile not found
            router.navigate(['/skills']);
            return EMPTY;
        }
    }));
};
