import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';


@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.scss']
})
export class ErrorBarComponent implements OnInit {

  constructor(public planets: PlanetsService) { }

  ngOnInit() {
  }

}
