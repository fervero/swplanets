import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWarsJSON } from './starwarsjson';
import { PlanetsService } from './planets.service';
import { Planet } from './planet';
import { Observable } from 'rxjs/Observable';
import { CacheService } from './cache.service';
import { of } from 'rxjs/observable/of';

const apiURL = "https://swapi.co/api";

@Injectable()
export class SinglePlanetService {

  constructor(private http: HttpClient, private cache: CacheService) { }

  extractPlanetID(url: string): string {
    return url.match(/planets\/([0-9]+)/)[1];
  }

  planetUrlFromID(id: string): string {
    return `${apiURL}/planets/${id}/`;
  }

  getSinglePlanetFromID(id: string): Planet {
    const url = this.planetUrlFromID(id);
    return this.getSinglePlanet(url);
  }

  getSinglePlanet(planetURL: string): Planet {
    return this.cache.findCachedPlanet(planetURL);
  }

  get(id: string): Observable<Planet> {
    const url = this.planetUrlFromID(id);
    const cached = this.cache.findCachedPlanet(url);
    if(cached) { 
      return of(cached)
    } else {
      const request = this.http.get<StarWarsJSON>(url);
      return this.cache.get(url, request);
    }
  }
}

/*
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWarsJSON } from './starwarsjson';
import { Planet } from './planet';
import { Observable } from 'rxjs/Observable';
import {CacheService} from './cache.service';

const apiURL = "https://swapi.co/api";;

@Injectable()
export class PlanetsService {

  constructor(private http: HttpClient, @Inject(CacheService) private cache: CacheService) { }

  getPlanets(path = `${apiURL}/planets/?page=1&format=json`): Observable<StarWarsJSON> {
    const request = this.http.get<StarWarsJSON>(path);
    return this.cache.get(path, request);
  }

  getNthPage(n: number): Observable<StarWarsJSON> {
    const path = `${apiURL}/planets/?page=${n}&format=json`;
    return this.getPlanets(path);
  }
}

*/