import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlanetsService } from './planets.service';
import { CacheService } from './cache.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PlanetsService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
