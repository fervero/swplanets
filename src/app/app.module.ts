import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PlanetsService } from './planets.service';
import { CacheService } from './cache.service';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { PlanetComponent } from './planet/planet.component';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { ToNumberPipe } from './to-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    PlanetComponent,
    FilterPipe,
    ToNumberPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PlanetsService, CacheService, SearchService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
