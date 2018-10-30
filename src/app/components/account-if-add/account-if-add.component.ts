import { Component, OnInit, Input } from '@angular/core';
import { IAccountIfAddData } from './account-if-add.interface';
import NumberFormat from '../../lib/number-format';

@Component({
  selector: 'app-account-if-add',
  templateUrl: './account-if-add.component.html',
  styleUrls: ['./account-if-add.component.scss']
})
export class AccountIfAddComponent implements OnInit {
  data: IAccountIfAddData[] = [];
  className: string;
  onlyOne: boolean;

  /**
   * data: [{
   *  name: string,
   *  number: number[], 12 | [100, 12] 12表示本周新增的个数
   * }]
   * showNum?: false| true
   */

  @Input() showNum: boolean = false;

  @Input("data") set _data(_s: IAccountIfAddData[]){
    if(!_s) return;
    _s.forEach( (val) => {
      if ( typeof(val.number) == 'number' ) {
        let result = NumberFormat.render(val.number as number);
        this.onlyOne = true;
        this.showNum = false;

        val.number = [result.value];
        val.name = val.name.replace(/(\(|（)/g, '$1' + result.unit);

      } else {
        this.onlyOne = false;
        let newAdd = val.number[1];
        if (newAdd > 0){
          val.addValue = "+" + newAdd;
        } else if (newAdd == 0) {
          val.addValue = '';
        }
        let result = NumberFormat.render(val.number[0] as number);
        val.number[0] = result.value;
        val.name = val.name.replace(/(\(|（)/g, '(' + result.unit);
      }
    })
    this.data = _s;

    if(_s.length === 5) {
      this.className = 'items5';
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
