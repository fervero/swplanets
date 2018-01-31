import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class HistoryService {
  public lastUrl: BehaviorSubject<string>;
  public lastParams: BehaviorSubject<{ [k: string]: string | number }>;

  constructor() {
   this.lastUrl = new BehaviorSubject("");
   this.lastParams = new BehaviorSubject({});
  }

  save(location: ActivatedRouteSnapshot): void {
    this.lastUrl.next("/" + location.url[0].path);
    this.lastParams.next(location.queryParams);
  }
}
