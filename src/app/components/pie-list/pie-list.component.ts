import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IMapData } from '../map/map.interface';
import { $FIVE_COLORS } from '../../../global.variable';

@Component({
  selector: 'app-pie-list',
  templateUrl: './pie-list.component.html',
  styleUrls: ['./pie-list.component.scss']
})
export class PieListComponent implements OnInit {

  /**
   * data: 饼图数据
   * name: 绑定的id(一个页面用多次该组件时，需传入不同name)
   * pieTxt: 饼图中间的文字
   */

  @Input('data') set _data(data: IMapData[]) {
    this.data = data || [];
    this.renderOption();
    this.renderChart();
  }
  @Input() labelColor?: string = '#D5D5D5';
  @Input() name?: string = 'pie-chart';
  @Input('pieTxt') set _pieTxt(_p: string) {
    this.pieTxt = _p;

    this.renderOption();
    this.renderChart();

  };

  private pieTxt: string = '库存占比';
  private data: IMapData[] = [];
  private sum: number;
  private pieChartOpt = {
    tooltip: {
      show: false
    },
    legend: {
      show: false,
    },
    color: $FIVE_COLORS,
    series: [
      {
        name: this.pieTxt,
        type:'pie',
        radius: ['55%', '75%'],
        avoidLabelOverlap: false,
        silent: true,    // 不响应和处罚鼠标行为
        label: {
          normal: {
            show: true,
            position: 'center',
            color: this.labelColor,
            formatter: '{a}',
            fontSize: '14'
          }
        },
        data:[]
      }
    ],
    animation: false
  };
  private colors: string[] = $FIVE_COLORS;
  private chart = null;
  constructor() { }

  renderOption() {
    // 计算总和，用于求比例
    let s = 0;
    this.data.forEach(v => {
      s += v.value;
    });
    this.sum = s;
    // 绑定数据
    this.pieChartOpt.series[0].name = this.pieTxt;
    this.pieChartOpt.series[0].data = this.data;
    this.pieChartOpt.series[0].label.normal.color = this.labelColor;
  }

  renderChart() {
    if(!this.chart) return;
    this.chart.setOption(this.pieChartOpt);
  }

  ngOnInit() {

  }
  ngAfterViewInit () {
    this.renderOption();
    this.chart = echarts.init(document.getElementById(this.name));
    this.renderChart();
  }
  onWindowResize() {
    this.chart.resize();
  }
}
