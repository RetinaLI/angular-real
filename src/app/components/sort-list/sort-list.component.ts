import { Component, OnInit, Input } from '@angular/core';
import {ISortListInterface} from './sort-list.interface';

@Component({
  selector: 'app-sort-list',
  templateUrl: './sort-list.component.html',
  styleUrls: ['./sort-list.component.scss']
})
export class SortListComponent implements OnInit {
  /**
   * data: [{
   *     title: '欧曼',
   *     progress: '50988' | 50,
   *     lift?: '0' | '1' | '2', // PS:传入字符串 上升-下降-不变[根据数据要求变化]
   *     node?: 12321,
   *     errNode?: 213213
   * }]
   * unit: ''; 进度条百分比单位: default: '%'; 'k'单位'k' | 'f'单位'分' | 'n' 无单位 | 'c' 单位'次'; P: [unit]="'k'"
   * sort: false; 是否显示排序
   *
   */
  @Input('data') set _data(data: ISortListInterface[]) {
    this.data = data || [];
    if (this.sort && this.data) {
      this.data = this.sorts(this.data);
    }
  };
  @Input() sort?: boolean = false;
  @Input() unit?: '%' | 'k' | 'c' | 'f' | 'n' = '%';

  data = [];
  liftClass: string[] = ['up', 'no', 'down'];

  constructor() { }

  ngOnInit() {
  }

  sorts(data) {
    data.sort((a, b) => {
      return parseFloat(b.progress) - parseFloat(a.progress);
    });
    return data;
  }
}
