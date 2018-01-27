import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class CacheService {
  private cache: Map<string, any>;

  constructor() { 
    this.cache = new Map();
  }

  get(key: string, fallback: Observable<any>): Observable<any> {
    if(this.cache.has(key)) {
      return of(this.cache.get(key))
    } else {
      return fallback
        .do((result) => this.cache.set(key, result))
    }
  }
}
