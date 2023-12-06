import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SitesComponent } from './sites/sites.component';
import { SitesCreateComponent } from './sites-create/sites-create.component';
import { SitesUpdateComponent } from './sites-update/sites-update.component';
import { SiteJobsComponent } from './site-jobs/site-jobs.component';
import { JobComponent } from './job/job.component';
import { ApplicationListComponent } from './application-list/application-list.component';

import { jobsResolver } from './jobs.resolver';
import { jobResolver } from './job.resolver';

const routes: Routes = [
  { path: "sites", component: SitesComponent },
  { path: "sites/add", component: SitesCreateComponent },
  { path: "sites/update/:slug/:id", component: SitesUpdateComponent, resolve: { site: jobsResolver } },
  { path: "sites/detail/:slug/:id", component: SiteJobsComponent, resolve: { site: jobsResolver } },
  { path: "sites/job/:slug/:id", component: JobComponent, resolve: { job: jobResolver } },
  { path: "applications", component: ApplicationListComponent },
  {
    path: 'letters',
    data: { breadcrumb: 'letters'},
    loadChildren: () =>
      import('./letters/letters.module').then((m) => m.LettersModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
