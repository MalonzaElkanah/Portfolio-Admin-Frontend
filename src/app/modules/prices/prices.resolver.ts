import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import { Pricing } from './prices';
import { PricingService } from './prices.service';

export const pricesResolver: ResolveFn<Pricing> = (route, state) => {
    const router = inject(Router);
    const pricingService = inject(PricingService);

    const routeId = route.paramMap.get('id')!;
    const pricingId = parseInt(atob(routeId), 10);

    return pricingService.getPricing(pricingId).pipe(mergeMap(pricing => {
        if (pricing) {
            return of(pricing);
        } else {  // pricing not found
            router.navigate(['/prices']);
            return EMPTY;
        }
    }));
};
