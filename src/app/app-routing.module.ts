import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModulesComponent } from './modules/modules.component';


const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(`./modules/modules.module`).then((m) => m.ModulesModule)
        //canActivate: [AuthGuard]
      },
    ],
  },
  // { path: '', redirectTo : 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
