import { Pipe, PipeTransform } from '@angular/core';
import NumberFormat from '../lib/number-format';

/**
 * @example <span *ngFor='let a of (10000 | numberFormater)'>{{a}}</span>
 */

@Pipe({
  name: 'numberFormater'
})
export class NumberFormaterPipe implements PipeTransform {

  transform(value: any, args?: any): [number, string] {
    let obj = NumberFormat.render(value);
    return [obj.value, obj.unit];
  }

}
