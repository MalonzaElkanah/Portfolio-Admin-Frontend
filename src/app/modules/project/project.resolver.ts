import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import {inject} from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Project } from './project';
import { ProjectService } from './project.service';

export const projectResolver: ResolveFn<Project> = (route, state) => {
    const router = inject(Router);
    const projectService = inject(ProjectService);

    const routeId = route.paramMap.get('id')!;
    const projectId = parseInt(atob(routeId), 10);

    return projectService.getProject(projectId).pipe(mergeMap(project => {
        if (project) {
            return of(project);
        } else {  // profile not found
            router.navigate(['/projects']);
            return EMPTY;
        }
    }));
};
