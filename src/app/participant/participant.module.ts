import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CastVoteComponent } from '../poll/cast-vote/cast-vote.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared-resources/material.module';
import { PollService } from '../poll/poll.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cast-vote', component: CastVoteComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [CastVoteComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule, FormsModule
  ],
  providers: [PollService],
})
export class ParticipantModule { }
