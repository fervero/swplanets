import { TestBed, inject } from '@angular/core/testing';

import { SinglePlanetService } from './single-planet.service';

describe('SinglePlanetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SinglePlanetService]
    });
  });

  it('should be created', inject([SinglePlanetService], (service: SinglePlanetService) => {
    expect(service).toBeTruthy();
  }));
});
