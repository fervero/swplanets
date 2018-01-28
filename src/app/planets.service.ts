import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWarsJSON } from './starwarsjson';
import { Planet } from './planet';
import { Observable } from 'rxjs/Observable';
import {CacheService} from './cache.service';

const apiURL = "https://swapi.co/api";

@Injectable()
export class PlanetsService {

  constructor(private http: HttpClient, private cache: CacheService) { }

  getPlanets(path = `${apiURL}/planets/?page=1&format=json`): Observable<StarWarsJSON> {
    const request = this.http.get<StarWarsJSON>(path);
    return this.cache.get(path, request);
  }

  getNthPage(n: number): Observable<StarWarsJSON> {
    const path = `${apiURL}/planets/?page=${n}&format=json`;
    return this.getPlanets(path);
  }

}
