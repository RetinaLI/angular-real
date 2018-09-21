import { Component, OnInit, Input } from '@angular/core';
import { IAccountIfAddData } from './account-if-add.interface';

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
   *  number: number[], 12 | [100, 12]
   * }]
   * showNum?: false| true
   */

  @Input() showNum: boolean = false;

  @Input("data") set _data(_s: IAccountIfAddData[]){
    if(!_s) return;
    _s.forEach( (val) => {
      if( typeof(val.number) == 'number' ) {
        this.onlyOne = true;
        this.showNum = false;
      } else {
        this.onlyOne = false;
        let newAdd = val.number[0]-val.number[1];
        if (newAdd > 0){
          val.addValue = newAdd + '';
        } else if (newAdd == 0) {
          val.addValue = '';
        } else{
          val.addValue = '+' +  (val.number[1]-val.number[0])+'';
        }
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
