import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CommentsComponent } from './comments/comments.component';

import { blogResolver } from './blog.resolver';

const routes: Routes = [
  { path: "articles", component: ArticleListComponent },
  { path: "articles/create", component: ArticleCreateComponent },
  { path: "articles/update/:slug/:id", component: ArticleUpdateComponent, resolve: { article: blogResolver } },
  { path: "articles/comments/:slug/:id", component: CommentsComponent, resolve: { article: blogResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
