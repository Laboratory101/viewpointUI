import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'host', loadChildren: './host/host.module#HostModule' },
  { path: 'participate', loadChildren: './participant/participant.module#ParticipantModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
