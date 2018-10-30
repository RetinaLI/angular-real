import { Component, OnInit, Input } from '@angular/core';

import {ISortInterface} from './sort.interface';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  /**
   * data: [{
   *     title: '欧曼',
   *     progress: 50,
   *     lift?: '0' | '1' | '2', // PS:传入字符串 上升-下降-不变[根据数据要求变化]
   * }]
   */

  @Input() data: ISortInterface[] = [];

  liftClass: string[] = ['up', 'no', 'down'];

  constructor() { }

  ngOnInit() {
  }
}
