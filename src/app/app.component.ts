import { Component, OnInit } from '@angular/core';
import { PlanetsService } from './planets.service';
import { StarWarsJSON } from './starwarsjson';
import { Planet } from './planet';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CacheService } from './cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Star Wars Planets";
  results: Array<Planet>;
  next: string = "";
  previous: string = "";
  subscription: Subscription;

  constructor(private planets: PlanetsService, private cache: CacheService) { }

  getPlanets(key?: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.cache.get(key, this.planets.getPlanets(key)) 
      .subscribe(response => {
        this.results = response.results;
        this.next = response.next;
        this.previous = response.previous;
      });
  }

  ngOnInit() {
    this.getPlanets();
  }

  getNext(): void {
    this.getPlanets(this.next);
  }
  getPrevious(): void {
    this.getPlanets(this.previous);
  }
}
