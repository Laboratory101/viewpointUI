import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PollBoardComponent } from './poll-board/poll-board.component';
import { MaterialModule } from 'src/shared-resources/material.module';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PollCandidateComponent } from './poll-candidate/poll-candidate.component';

const routes: Routes = [
  { path: '', redirectTo: 'pollboard', pathMatch: 'full' },
  { path: 'pollboard', component: PollBoardComponent },
  { path: 'viewpoll', component: PollDetailsComponent },
  { path: '**', redirectTo: '/pollboard' }
];

@NgModule({
  declarations: [PollBoardComponent, PollDetailsComponent, PollCandidateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule, ReactiveFormsModule, FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PollModule { }
