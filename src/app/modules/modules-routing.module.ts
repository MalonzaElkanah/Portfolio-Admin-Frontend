import { NgModule } from '@angular/core';
import { AuthGuard } from '../core/authentication/auth.guards';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    data: { breadcrumb: 'Dashboard' },
    loadChildren: () =>
      import(`./dashboard/dashboard.module`).then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    data: { breadcrumb: 'Messages' },
    loadChildren: () =>
      import(`./messages/messages.module`).then((m) => m.MessagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    data: { breadcrumb: 'Profile' },
    loadChildren: () =>
     import(`./profile/profile.module`).then((m) => m.ProfileModule), canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    data: { breadcrumb: 'projects'},
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule), canActivate: [AuthGuard]
  },
  {
    path: 'work',
    data: { breadcrumb: 'work'},
    loadChildren: () =>
      import('./work/work.module').then((m) => m.WorkModule), canActivate: [AuthGuard]
  },
  {
    path: 'education',
    data: { breadcrumb: 'education' },
    loadChildren: () =>
      import('./education/education.module').then((m) => m.EducationModule), canActivate: [AuthGuard]
  },
  {
    path: 'skills',
    data: { breadcrumb: 'skills'},
    loadChildren: () =>
      import('./skills/skills.module').then((m) => m.SkillsModule), canActivate: [AuthGuard]
  },
  {
    path: 'services',
    data: { breadcrumb: 'services'},
    loadChildren: () =>
      import('./services/services.module').then((m) => m.ServicesModule), canActivate: [AuthGuard]
  },
  {
    path: 'pricing',
    data: { breadcrumb: 'pricing'},
    loadChildren: () =>
      import('./prices/prices.module').then((m) => m.PricesModule), canActivate: [AuthGuard]
  },
  {
    path: 'blog',
    data: { breadcrumb: 'blog'},
    loadChildren: () =>
      import('./blog/blog.module').then((m) => m.BlogModule), canActivate: [AuthGuard]
  },
  {
    path: 'job',
    data: { breadcrumb: 'jobs'},
    loadChildren: () =>
      import('./jobs/jobs.module').then((m) => m.JobsModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
