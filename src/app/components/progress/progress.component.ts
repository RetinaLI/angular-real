import {Component, OnInit, Input} from '@angular/core';

import {IProgressInterface} from './progress.interface';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  /**
   * data: [{
   *     title: '欧曼',
   *     progress: '50%' | 50,
   *     progressTwo?: '30%' | 30, // 是否显示两条进度条
   *     problem?: '轨压故障',
   *     lift?: '0' | '1' | '2', // PS:传入字符串 上升-下降-不变[根据数据要求变化]
   * }]
   * layout: false; 进度条显示格式 default: false
   * unit: ''; 进度条百分比单位: default: '%'; 'k'单位'k' | 'f'单位'分' | 'n' 无单位; P: [unit]="'k'"
   * sort: false; 是否显示排序
   * sortLayout: false; 排序样式
   *
   * special: falst; 特殊的进度条 -> 以最大值参照100%，其他的类推;
   *
   * 关于样式
   * marginBottom: number | .1; 下边距；数字不带单位(rem) P: [marginBottom]=".1"
   * textColor: 进度条百分比文字颜色 default: 'blue'; 'red' | 'blue' | 'yellow'
   * textSecColor: 第二条进度条百分比文字颜色 default: 'blue'; 'red' | 'blue' | 'yellow'
   * bgColor: 进度条颜色 default: 'blue'; 'red' | 'blue' | 'yellow'
   * bgSecColor: 第二条进度条颜色 default: 'blue'; 'red' | 'blue' | 'yellow'
   *
   */

  @Input('data') set _data(data: IProgressInterface[]) {
    this.data = data || [];
    if (this.data) {
      this.setTitleWidth = this.getTitleWidth(this.data);
      if (this.sort) {
        this.data = this.sorts(this.data);
      }
      if (this.special) {
        this.perNums = this.getMax(this.data);
      }
    }
  };
  @Input() sort?: boolean = false;
  @Input() sortLayout?: boolean = false;
  @Input() layout?: boolean = false;
  @Input() unit?: string;
  @Input() bgColor?: string = 'blue';
  @Input() bgSecColor?: string = 'yellow';
  @Input() textSecColor?: string = 'blue';
  @Input() textColor?: string = 'blue';
  @Input() marginBottom?: number;
  @Input() special?: boolean = false;

  data = [];
  liftClass: string[] = ['up', 'no', 'down'];
  setTitleWidth = '.61rem';
  perNums = [];

  constructor() {
  }

  ngOnInit() {
  }

  sorts(data) {
    if (!data) return;
    data.sort((a, b) => {
      return parseFloat(b.progress) - parseFloat(a.progress);
    });
    return data;
  }

  getMax(data) {
    if (!data) return;
    let num = [];
    let per = [];
    data.map(ele => {
      num.push(ele.progress);
    });
    let maxNum = Math.max.apply(Math, num);
    num.map(ele => {
      per.push(ele / maxNum * 100);
    });
    return per;
  }

  getTitleWidth(data) {
    if (data) {
      let long = [];
      data.map(ele => {
        long.push(ele.title.length);
      });
      let maxLen = Math.max.apply(Math, long);
      return maxLen > 4 ? maxLen * 14 / 100 + 'rem' : '.61rem';
    }
  }
}
