import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxSummernoteModule } from 'ngx-summernote';

import { BlogRoutingModule } from './blog-routing.module';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    ArticleCreateComponent,
    ArticleUpdateComponent,
    ArticleListComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    NgSelectModule,
    DataTablesModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
