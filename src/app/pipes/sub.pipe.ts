import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sub'
})
export class SubPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    return value.length > 5 ? `${value.substr(0, value.length - 5)}\n${value.substr(-5)}` : value;
  }
}
