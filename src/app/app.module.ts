import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PlanetsService } from './planets.service';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { PlanetComponent } from './planet/planet.component';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { ToNumberPipe } from './to-number.pipe';
import { MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PaginatePipe } from './paginate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HistoryService } from './history.service';
import { ErrorBarComponent } from './error-bar/error-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    PlanetComponent,
    FilterPipe,
    ToNumberPipe,
    PaginatePipe,
    ErrorBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [PlanetsService, SearchService, DecimalPipe, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
