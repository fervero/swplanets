import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  public readonly count: number = 61;
  private pagination: BehaviorSubject<number>;
  private page: BehaviorSubject<number>;
  public pagination$: Observable<number>;
  public page$: Observable<number>;
  public links: BehaviorSubject<number[]>;
  public position: BehaviorSubject<number>;

  constructor() {
    this.pagination = new BehaviorSubject(10);
    this.pagination$ = this.pagination.distinctUntilChanged();
    this.page = new BehaviorSubject(1);
    this.page$ = this.page.distinctUntilChanged();
    this.position = new BehaviorSubject(1);
    this.links = new BehaviorSubject([1]);
  }


  getLinksFromPageNumber(page): number[] {
    const min = 1 + (this.page.getValue() - 1) * this.pagination.getValue();
    const max = this.page.getValue() * this.pagination.getValue();
    return [page - 2, page - 1, page, page + 1, page + 2]
      .filter((x) => (x >= min) && (x <= max));
  }

  changePagination(val): void {
    this.pagination.next(val);
  }

  changePosition(val): void {
    this.position.next(val);
  }

  changePage(val): void {
    const newPage = this.page.getValue() + val; 
    const newPosition = (val > 0) ? 1 + (newPage - 1) * this.pagination.getValue() : newPage * this.pagination.getValue();
    this.changePosition(newPosition);
    this.page.next(newPage);
  }

  ngOnInit() {
    this.pagination$
      .subscribe(val => {
        this.links.next(this.getLinksFromPageNumber(this.position.getValue()));
      });
    this.position
      .subscribe(val => {
        this.links.next(this.getLinksFromPageNumber(this.position.getValue()));
      });
    this.page$
      .subscribe(console.log);
    this.page$
      .subscribe(val => {
        this.links.next(this.getLinksFromPageNumber(this.position.getValue()));
      });
  }

}
