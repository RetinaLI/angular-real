import { Component, OnInit, Input } from '@angular/core';
import { IBarData} from './bar.interface';
import { $YELLOW } from '../../../global.variable';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input('data') set _data(data: IBarData[]) {
    this.data = data || [];
    this.renderOption();
    this.renderChart();
  }
  @Input() name?: string = 'bar-chart';
  @Input() colorBar?: string = '#4475FD';

  private data: IBarData[] = [];
  private chart = null;

  private barChartOption = {
    calculable: true,
    legend: {
      x:'right',
      bottom: 0,
      data: ['及时起运', '未及时起运'],
      icon: 'circle',
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        color: '#666',
        opacity: '.1'
      }
    },
    grid: {
      top: '8%',
      left: '13%',
      right: "3%"
      // containLabel: true
    },
    //x轴显示
    xAxis: {
      data: [],
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#666', // 左边线的颜色
          width: '1', // 坐标线的宽度
          opacity: .1
        }
      },
      axisLabel: {
        color: 'rgba(51,51,51, 0.4)'
      }
    },
    //y轴显示
    yAxis: {
      splitLine: {
        lineStyle: {
          color: ['#666'],
          opacity: .1
        }
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#666', // 左边线的颜色
          width: '1', // 坐标线的宽度
          opacity: .1
        }
      },
      axisLabel: {
        color: 'rgba(51,51,51, 0.4)'
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: "及时起运",
        type: "bar",
        stack: "业务",//折叠显示
        data: [12, 12, 12, 34, 22, 33, 34],
        barWidth: 8,
        //显示颜色
        itemStyle: {
          normal: {
            color: this.colorBar,
            barBorderRadius: [0, 0, 4, 4]
          }
        }
      },
      {
        name: "未及时起运",
        type: "bar",
        stack: "业务",
        data: [12, 12, 12, 34, 22, 33, 12],
        barWidth: '.08rem',
        itemStyle: {
          normal: {
            color: $YELLOW,
            barBorderRadius: [4, 4, 0, 0]
          }
        }
      }
    ]
  };

  constructor() { }

  renderOption() {
    let xArr = [];
    let series0 = [];
    let series1 = [];
    this.data.forEach( (val) => {
      xArr.push(val.date);
      series0.push(val.number[0]);
      series1.push(val.number[1])
    })
    this.barChartOption.xAxis.data = xArr;
    this.barChartOption.series[0].data = series0;
    this.barChartOption.series[1].data = series1;
    this.barChartOption.series[0].itemStyle.normal.color = this.colorBar;
  }

  renderChart() {
    if(!this.chart) return;
    this.chart.setOption(this.barChartOption);

  }

  ngOnInit() {
  }

  ngAfterViewInit () {
    this.renderOption();
    this.chart = echarts.init(document.getElementById(this.name));
    this.renderChart();
  }

  onWindowResize() {
    if(!this.chart) return;
    this.chart.resize();
  }

}
