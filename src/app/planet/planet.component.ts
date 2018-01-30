import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Planet } from '../planet';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  public planet: Planet;
  public error: boolean;
  private subscription: Observable<Planet>;


  constructor(private route: ActivatedRoute, private planets: PlanetsService, private location: Location) {
    this.error = false;
  }

  isNumber(x: string): boolean {
    return !!parseFloat(x);
  }

  back(): void {
    this.location.back();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.planets.init()
      .then(() => this.planet = this.planets.findPlanetByID(id));
  }

}
