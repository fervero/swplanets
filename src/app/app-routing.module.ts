import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  { path: 'planets', component: PlanetsListComponent },
  { path: 'planet/:id', component: PlanetComponent },
  { path: '', redirectTo: '/planets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
