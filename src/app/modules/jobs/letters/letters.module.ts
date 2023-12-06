import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSummernoteModule } from 'ngx-summernote';

import { LettersRoutingModule } from './letters-routing.module';
import { LetterCreateComponent } from './letter-create/letter-create.component';
import { LetterUpdateComponent } from './letter-update/letter-update.component';
import { LetterListComponent } from './letter-list/letter-list.component';
import { LetterDetailComponent } from './letter-detail/letter-detail.component';
// import { LetterComponent } from './letter/letter.component';


@NgModule({
  declarations: [
    LetterCreateComponent,
    LetterUpdateComponent,
    LetterListComponent,
    LetterDetailComponent,
    // LetterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    LettersRoutingModule
  ]
})
export class LettersModule { }
