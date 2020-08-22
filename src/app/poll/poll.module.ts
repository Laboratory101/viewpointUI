import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PollBoardComponent } from './poll-board/poll-board.component';
import { MaterialModule } from 'src/shared-resources/material.module';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PollCandidateComponent } from './poll-candidate/poll-candidate.component';
import { PollService } from './poll.service';
import { CopyToClipboardDirective } from 'src/shared-resources/directives/copy-to-clipboard.directive';
import { AccessGuard } from 'src/shared-resources/services/access-guard';

const routes: Routes = [
  { path: '', redirectTo: 'pollboard', pathMatch: 'full' },
  { path: 'pollboard', component: PollBoardComponent },
  { path: 'viewpoll', component: PollDetailsComponent, canActivate:[AccessGuard],data:{navigateTo:'/host/poll'} },
  { path: '**', redirectTo: '/pollboard' }
];

@NgModule({
  declarations: [PollBoardComponent, PollDetailsComponent, PollCandidateComponent, CopyToClipboardDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule, ReactiveFormsModule, FormsModule
  ],
  providers: [PollService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PollModule { }
