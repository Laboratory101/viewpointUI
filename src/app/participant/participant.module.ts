import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared-resources/material.module';
import { PollService } from '../poll/poll.service';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { ParticipantService } from './participant.service';
import { AccessGuard } from 'src/shared-resources/services/access-guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cast-vote', component: CastVoteComponent, canActivate: [AccessGuard], data: { navigateTo: '/participate' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [CastVoteComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule, FormsModule
  ],
  providers: [PollService, ParticipantService],
})
export class ParticipantModule { }
