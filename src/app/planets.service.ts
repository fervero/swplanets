import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWarsJSON } from './starwarsjson';
import { Planet } from './planet';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlanetsService {
  readonly apiURL = "https://swapi.co/api/";

  constructor(private http: HttpClient) { }

  getPlanets(path = this.apiURL + "planets"): Observable<StarWarsJSON> {
    return this.http.get<StarWarsJSON>(path);
  }

}
