import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HostDashbordComponent } from './host-dashbord/host-dashbord.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/shared-resources/material.module';
import { AccessGuard } from 'src/shared-resources/services/access-guard';
import { TimerPopupComponent } from 'src/shared-resources/components/timer-popup/timer-popup.component';

const routes: Routes = [
  {
    path: '', component: HostDashbordComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'poll', loadChildren: '../poll/poll.module#PollModule', canActivate: [AccessGuard], data: { navigateTo: '/host/login' } },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  declarations: [HostDashbordComponent, LoginComponent, TimerPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class HostModule { }
