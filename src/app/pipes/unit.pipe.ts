import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: any, unit?: any) {
    switch (unit) {
      case 'c':
        return parseFloat(value) + '次';
      case 'k':
        return parseFloat(value) + 'k';
      case 'f':
        return parseFloat(value) + '分';
      case 'n':
        return parseFloat(value);
      default:
        return (Math.round(parseFloat(value) * 10) / 10).toFixed(1) + '%';
    }
    // return value;
  }
}
