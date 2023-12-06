import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LetterCreateComponent } from './letter-create/letter-create.component';
import { LetterDetailComponent } from './letter-detail/letter-detail.component';
import { LetterListComponent } from './letter-list/letter-list.component';
import { LetterUpdateComponent } from './letter-update/letter-update.component';
// import { LetterComponent } from './letter/letter.component';

import { lettersResolver } from './letters.resolver';

const routes: Routes = [
  { path: "", component: LetterListComponent },
  { path: "add", component: LetterCreateComponent },
  { path: "detail/:slug/:id", component: LetterDetailComponent, resolve: { letter: lettersResolver } },
  { path: "update/:slug/:id", component: LetterUpdateComponent, resolve: { letter: lettersResolver } },
  // { path: "letter/:slug/:id", component: LetterComponent, resolve: { letter: lettersResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LettersRoutingModule { }
