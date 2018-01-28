import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { SinglePlanetService } from '../single-planet.service';
import { StarWarsJSON } from '../starwarsjson';
import { Planet } from '../planet';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CacheService } from '../cache.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

const DEFAULT_PAGINATION = 10;
const DEFAULT_PAGE = 1;

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  results: Array<Planet>;
  next: string = "";
  previous: string = "";
  subscription: Subscription;
  public page: number;
  public totalCount: number;

  constructor(
    private planets: PlanetsService,
    private singlePlanet: SinglePlanetService,
    private cache: CacheService,
    private route: ActivatedRoute
  ) {
    this.page = DEFAULT_PAGE;
  }

  getNthPage(n: number): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.planets.getNthPage(n)
      .subscribe(response => {
        this.results = response.results;
        this.next = response.next;
        this.previous = response.previous;
        this.totalCount = response.count;
      });
  }

  retrievePlanet(name: string): void {
    const planet: Planet = this.singlePlanet.getSinglePlanet(name);
    console.log(planet);
  }

  extractPlanetId = this.singlePlanet.extractPlanetID;

  ngOnInit() {
    this.getNthPage(1);
    this.route.queryParams.subscribe((params) => {
      if (params.start) {
        this.page = parseInt(params.start);
        this.getNthPage(this.page);
      }
    });
  }

}
