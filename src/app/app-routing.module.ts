import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsListComponent } from './planets-list/planets-list.component';

const routes: Routes = [
  { path: 'planets', component: PlanetsListComponent },
  { path: '', redirectTo: '/planets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
