import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpCacheModule } from 'ng-http-cache';

import { AppComponent } from './app.component';
import { PlanetsService } from './planets.service';
import { CacheService } from './cache.service';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { PagerComponent } from './pager/pager.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpCacheModule
  ],
  providers: [PlanetsService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
