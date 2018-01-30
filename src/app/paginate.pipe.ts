import { Pipe, PipeTransform } from '@angular/core';
import { Planet } from './planet';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform(planets: Planet[], page: number, pageSize: number = 10): Planet[] {
    return planets.slice((page - 1) * pageSize, page * pageSize);
  }
}
