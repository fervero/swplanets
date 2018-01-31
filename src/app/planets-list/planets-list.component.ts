import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { SearchService } from '../search.service';
import { StarWarsJSON } from '../starwarsjson';
import { Planet } from '../planet';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter, tap, withLatestFrom, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators/switchMap';
import { HistoryService } from '../history.service';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  filteredList: Observable<Planet[]>;
  public searchBoxTerm: string = "";
  public searchTerm: string = "";
  public pageSize: number;
  public pageIndex: number;
  public loading: boolean = true;

  constructor(
    public planets: PlanetsService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private history: HistoryService
  ) { }

  updateSearch(term: string): void {
    this.searchService.search(term);
  }

  extractPlanetId = this.planets.extractPlanetID;

  isNumber(x: string): boolean {
    return !!parseFloat(x);
  }

  onPaginateChange({ length, pageSize, pageIndex }): void {
    const pagerParams = {
      page: pageIndex + 1,
      pagesize: pageSize
    };
    const searchParams = this.searchTerm ? {search: this.searchTerm} : {};
    this.router.navigate(["/planets"], { queryParams: Object.assign({}, pagerParams, searchParams)    });
  }

  initSubscriptions = () => {
    this.route.queryParams.subscribe(({ search, page, pagesize }) => {
      this.history.save(this.route.snapshot);
      // Separate properties: searchBoxTerm and searchTerm - the first one is directly tied to the search box
      // and updates in real time, the latter is debounced by a few hundred ms, so the router doesn't navigate
      // somewhere away every time the user types one letter.
      this.searchTerm = this.searchBoxTerm = search || "";
      this.pageSize = pagesize || DEFAULT_PAGE_SIZE;
      this.pageIndex = (page || DEFAULT_PAGE) - 1;
      this.filteredList = this.planets.filterByName(this.searchTerm);
    });
    this.searchService.search$
      .subscribe((term) => {
        if (term.length > 0) {
          this.router.navigate(["/planets"], { queryParams: { search: term, page: DEFAULT_PAGE, pagesize: this.pageSize } });
        } else {
          this.router.navigate(["/planets"]);
        }
      });

  }

  ngOnInit() {
    this.planets.init()
      .then(() => this.loading = false)
      .then(this.initSubscriptions);
  }

};