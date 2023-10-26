import { ResolveFn, ActivatedRouteSnapshot, Router  } from '@angular/router';
import {inject} from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Service } from './service';
import { ServiceService } from './service.service';


export const servicesResolver: ResolveFn<Service> = (route, state) => {
    const router = inject(Router);
    const serviceService = inject(ServiceService);

    const routeId = route.paramMap.get('id')!;
    const serviceId = parseInt(atob(routeId), 10);

    return serviceService.getService(serviceId).pipe(mergeMap(service => {
        if (service) {
            return of(service);
        } else {  // education not found
            router.navigate(['/services']);
            return EMPTY;
        }
    }));
};
