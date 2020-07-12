import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HostDashbordComponent } from './host-dashbord/host-dashbord.component';

const routes: Routes = [
  {
    path: '', component: HostDashbordComponent, children: [
      { path: 'poll', loadChildren: '../poll/poll.module#PollModule' },
      { path: '**', redirectTo: '/host' }
    ]
  }
];

@NgModule({
  declarations: [HostDashbordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HostModule { }
