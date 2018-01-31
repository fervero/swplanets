import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Planet } from '../planet';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HistoryService } from '../history.service';
import 'rxjs/add/operator/catch';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  public planet: Planet;
  public error: boolean;

  constructor(private route: ActivatedRoute,
    private planets: PlanetsService,
    public history: HistoryService,
  ) {
    this.error = false;
  }

  isNumber(x: string): boolean {
    return !!parseFloat(x);
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.planets.init()
      .then(() => this.planet = this.planets.findPlanetByID(id));
  }
}
