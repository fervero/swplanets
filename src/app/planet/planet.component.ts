import { Component, OnInit } from '@angular/core';
import { SinglePlanetService } from '../single-planet.service';
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


  constructor(private route: ActivatedRoute, private singlePlanet: SinglePlanetService) {
    this.error = false;
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.subscription = this.singlePlanet.get(id);
    this.subscription
      .catch((e) => {
        this.error = true;
        return Observable.throw("HTTP error")
      })
      .subscribe((planet) => {
        this.planet = planet;
        this.error = false
      });
  }

}
