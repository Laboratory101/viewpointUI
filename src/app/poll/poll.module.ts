import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PollComponent } from './poll/poll.component';
import { MaterialModule } from 'src/shared-resources/material.module';

const routes: Routes = [
  { path: '', redirectTo: 'viewPoll', pathMatch: 'full' },
  { path: 'viewPoll', component: PollComponent },
  { path: '**', redirectTo: '/viewPoll' }
];

@NgModule({
  declarations: [PollComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PollModule { }
