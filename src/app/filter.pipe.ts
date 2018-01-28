import { Pipe, PipeTransform } from '@angular/core';
import { Planet } from './planet';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(planets: Planet[], searchTerm: string): Planet[] {
    return planets.filter(({name}) => name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
