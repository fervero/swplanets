import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  constructor(private decimal: DecimalPipe) { }
  
  transform(x: string): string {
    return parseFloat(x) ? this.decimal.transform(x) : x;
  }

}
