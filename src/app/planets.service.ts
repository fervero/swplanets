import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWarsJSON } from './starwarsjson';
import { Planet } from './planet';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { CacheService } from './cache.service';
import { UnaryFunction } from 'rxjs/interfaces';

const apiURL = "https://swapi.co/api";
const fallbackURL = "/assets";

/**
 * Create an array [2, 3, ..., n] for given n.
 * @param n 
 */
const range = (n: number) => [...Array(n + 1).keys()].filter(x => x > 1);

@Injectable()
export class PlanetsService {
  planets$: BehaviorSubject<Planet[]>;
  error$: Subject<string>;

  constructor(private http: HttpClient, private cache: CacheService) {
    this.planets$ = new BehaviorSubject([]);
    this.error$ = new Subject();
  }

  get(path): Promise<any> {
    return this.http.get(path).toPromise();
  }

  getNthPage(n: number = 1): Promise<StarWarsJSON> {
    const path = `${apiURL}/planets/` + ((n > 1) ? `?page=${n}&format=json` : ``);
    return this.get(path);
  }
  getNthPageLocally(n: number = 1): Promise<StarWarsJSON> {
    const path = `${fallbackURL}/planets` + ((n > 1) ? `.${n}` : ``) + `.json`;
    return this.get(path);
  }

  /**
   * Retrieves all planets from the specified resource URL. As much as I'm crushing on RxJS observables,
   * I believe that at least in this case the async/await syntax is easier to read.
   * 
   * @param getNthPage Function generating http requests
   */
  async getAllPlanets(getNthPage: Function): Promise<Planet[]> {
    const firstRequest = await (getNthPage(1));
    const requestsRange = range(Math.ceil(firstRequest.count / 10));
    const followingRequests = requestsRange
      .map((n) => getNthPage(n));
    const followingPlanetArrays = (await Promise.all(followingRequests))
      .map((json) => json.results)
      .reduce((arr1, arr2) => [...arr1, ...arr2]);
    return Promise.resolve([...firstRequest.results, ...followingPlanetArrays]);
  }

  getAllPlanetsFromAPI(): Promise<Planet[]> {
    return this.getAllPlanets(this.getNthPage.bind(this));
  }

  getAllPlanetsLocally(): Promise<Planet[]> {
    return this.getAllPlanets(this.getNthPageLocally.bind(this));
  }

  search(planets: Planet[], term: string): Planet[] {
    return planets.filter(
      ({name}) => name.includes(term)
    )
  }

  extractPlanetID(url: string): string {
    return url.match(/planets\/([0-9]+)/)[1];
  }

  findPlanetByID(id: string): Planet {
    const planets = this.planets$.getValue();
    return planets
      .find((planet) => { 
        const str = planet.url.match(/planets\/([0-9]+)\/?/)[1];
        return str === id});
  }

  init(): Promise<any> {
    if(this.planets$.getValue().length > 0) {
      return Promise.resolve(true);
    } 
    else return this.getAllPlanetsFromAPI()
      .then(
      (results) => this.planets$.next(results))
      .catch((err) => {
        console.error(err);
        this.error$.next("Cannot reach the Star Wars API, retrieving the local version.");
        this.getAllPlanetsLocally().then(
          (results) => { 
            this.error$.next("Using locally backed up data, might not be up to date.");
            this.planets$.next(results); 
          }
        )
        .catch((err2) => {
          console.error(err2);
          this.error$.next("Couldn't retrieve data")
        })
      })
  }
}
