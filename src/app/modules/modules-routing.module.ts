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
  }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
