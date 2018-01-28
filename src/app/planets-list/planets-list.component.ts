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

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  results: Array<Planet>;
  next: string = "";
  previous: string = "";
  public searchBoxTerm: string = "";
  public searchTerm: string = "";

  constructor(
    public planets: PlanetsService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) { }

  updateSearch(term: string): void {
    this.searchService.search(term);
  }

  extractPlanetId = this.planets.extractPlanetID;

  isNumber(x: string): boolean {
    return !!parseFloat(x);
  }

  ngOnInit() {
    this.planets.init();
    this.route.queryParams.subscribe((params) => {
      if (params.search) {
        this.searchBoxTerm = params.search;
      } else {
        this.searchBoxTerm = "";
      }
      this.searchTerm = this.searchBoxTerm;
    });
    this.searchService.search$
      .subscribe((term) => {
        if (term.length > 0) {
          this.router.navigate(['/planets'], { queryParams: { search: term } })
        } else {
          this.router.navigate(['/planets'])
        }
      })
  }
};