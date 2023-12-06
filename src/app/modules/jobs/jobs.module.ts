import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSummernoteModule } from 'ngx-summernote';

import { LettersModule } from './letters/letters.module';

import { JobsRoutingModule } from './jobs-routing.module';
import { SitesComponent } from './sites/sites.component';
import { SitesCreateComponent } from './sites-create/sites-create.component';
import { SitesUpdateComponent } from './sites-update/sites-update.component';
import { SiteJobsComponent } from './site-jobs/site-jobs.component';
import { JobComponent } from './job/job.component';
import { ApplicationListComponent } from './application-list/application-list.component';

@NgModule({
  declarations: [
    SitesComponent,
    SitesCreateComponent,
    SitesUpdateComponent,
    SiteJobsComponent,
    JobComponent,
    ApplicationListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    LettersModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
