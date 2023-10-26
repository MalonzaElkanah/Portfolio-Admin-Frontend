import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Article } from './blog';
import { BlogService } from './blog.service';

export const blogResolver: ResolveFn<Article> = (route, state) => {
    const router = inject(Router);
    const blogService = inject(BlogService);

    const routeId = route.paramMap.get('id')!;
    const articleId = parseInt(atob(routeId), 10);

    return blogService.getArticle(articleId).pipe(mergeMap(article => {
        if (article) {
            return of(article);
        } else {  // article not found
            router.navigate(['/blog/articles']);
            return EMPTY;
        }
    }));
};
