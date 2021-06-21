import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PollsComponent} from './polls/polls.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  {path: 'enquetes', component: PollsComponent},
  {path: '', redirectTo: 'enquetes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
