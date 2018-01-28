import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Planet } from './planet';
import { StarWarsJSON } from './starwarsjson';
import { PlanetsService } from './planets.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

const SEARCH_DEBOUNCE_TIME = 250;

@Injectable()
export class SearchService {
  private searchTerm: Subject<string>;
  public search$: Observable<string>;

  constructor(public planets: PlanetsService) {
    this.searchTerm = new Subject<string>();
    this.search$ = this.searchTerm
      .pipe(
      debounceTime(SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged()
      );
  }

  public search(searchTerm: string): void {
    this.searchTerm.next(searchTerm);
  }

}
