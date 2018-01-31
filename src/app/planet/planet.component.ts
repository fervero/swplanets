import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '../planet';
import { HistoryService } from '../history.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  public planet: Planet;

  constructor(private route: ActivatedRoute,
    private planets: PlanetsService,
    public history: HistoryService,
  ) { }

  isNumber(x: string): boolean {
    return !!parseFloat(x);
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.planets.init()
      .then(() => this.planet = this.planets.findPlanetByID(id));
  }
}
