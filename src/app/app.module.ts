import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlanetsService } from './planets.service';
import { CacheService } from './cache.service';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { PagerComponent } from './pager/pager.component';
import { PlanetComponent } from './planet/planet.component';
import { SinglePlanetService } from './single-planet.service';


@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    PagerComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [PlanetsService, SinglePlanetService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
