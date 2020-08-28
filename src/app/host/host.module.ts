import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HostDashbordComponent } from './host-dashbord/host-dashbord.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/shared-resources/material.module';

const routes: Routes = [
  {
    path: '', component: HostDashbordComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'poll', loadChildren: '../poll/poll.module#PollModule' },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  declarations: [HostDashbordComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class HostModule { }
