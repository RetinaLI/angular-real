import {Component, OnInit} from '@angular/core';

import {DataService} from '../../services/data.service';
import {ITopNavData} from '../../components/top-nav/top-nav.interface';
import {IProductData} from '../../services/data.interface';
import {IAccountIfAddData} from '../../components/account-if-add/account-if-add.interface';
import {IProgressInterface} from '../../components/progress/progress.interface';
import {ISortInterface} from '../../components/sort/sort.interface';
import {ISortListInterface} from '../../components/sort-list/sort-list.interface';
import {addDate} from '../../lib/addDate';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `用户使用大数据报告`,
    platform: '福田车联网平台'
  };
  accountIfAdd: IAccountIfAddData[] = [{
    number: [0, 0],
    name: '',
    addValue: ''
  },{
    number: [0, 0],
    name: '',
    addValue: ''
  }];
  sortList: IProgressInterface[] = [];
  visitList: IProgressInterface[] = [];
  sortTopList: ISortInterface[] = [];
  listSort: ISortListInterface[] = [];
  parkList: ISortListInterface[] = [];
  dealerList: ISortListInterface[] = [];
  dealerScale: any = [{
    value: 0,
    name: '',
  }];
  parkScale: any = [{
    value: 0,
    name: '',
  }];
  visitOption: any;
  chartSum: any = {};
  comPieData: any = [{
    value: 0,
    name: '',
    title: '',
    num: 0
  }];
  dealerPieData: any = [{
    value: 0,
    name: '',
    title: '',
    num: 0
  }];

  dealerColor: string[] = ['#4475FD', '#3DE3A3', '#FFBC53', '#FFD94F', '#F56C6C', '#D5D5D5'];
  comPieColor: string[] = ['#4475FD', '#D5D5D5'];
  dealerPieColor: string[] = ['#FFBC53', '#D5D5D5'];

  detail: any = {
    text: '持平',
    result: 0
  };
  detailCom: any = {
    text: '持平',
    result: 0
  };

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    let reportData = this.dataService.reportData as IProductData;
    if (!reportData || reportData === undefined) return false;
    let {
      title,
      platform,
      startDate,
      endDate,
      accountIfAddData,
      sortList,
      visitList,
      sortTopList,
      listSort,
      parkList,
      dealerList,
      dealerScale,
      parkScale,
      visitChartData,
      days,
      comPieData,
      dealerPieData
    } = reportData as IProductData;
    title = `用户使用大数据${reportData.timeRangeType}报`;
    this.bannerInfo = {title, platform, startDate, endDate};
    this.pageTitle.setTitle(title);
    this.accountIfAdd = accountIfAddData;
    this.detail = this.getDetailIndex(this.accountIfAdd[0]);
    this.detailCom = this.getDetailIndex(this.accountIfAdd[1], true);
    this.sortList = sortList;
    this.visitList = visitList;
    this.sortTopList = sortTopList;
    this.listSort = listSort;
    this.parkList = parkList;
    this.dealerList = dealerList;
    this.dealerScale = dealerScale;
    this.parkScale = parkScale;
    // 渲染折线图
    this.bindChartList(visitChartData, days);
    this.chartSum = this.getChartSum(visitChartData, startDate);
    // 百分比
    this.comPieData = comPieData;
    this.dealerPieData = dealerPieData;
  }

  getChartSum(data, startDate) {
    let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    let sum = data[0].percents.reduce((prve, next) => {
      return prve + next;
    });
    let sumLast = data[1].percents.reduce((prve, next) => {
      return prve + next;
    });
    let per = (sum - sumLast) / sumLast * 100;
    let maxNum = Math.max.apply(Math, data[0].percents);
    let maxIndex = data[0].percents.indexOf(maxNum);
    return {
      sum,
      per,
      maxNum,
      week: week[maxIndex],
      date: addDate(startDate, maxIndex)
    };
  }

  getDetailIndex(data, bool = false) {
    let index = 2;
    let result = 0;
    let detail = ['增长', '下降', '持平'];
    if (data.number[0] > data.number[1]) {
      result = data.number[0] - data.number[1];
      index = 0;
    } else if (data.number[0] < data.number[1]) {
      result = data.number[1] - data.number[0];
      index = 1;
    } else {
      if (bool) {
        index = 0;
      } else {
        index = 2;
      }
    }
    return {
      text: detail[index],
      result
    };
  }

  bindChartList(data, day) {
    let colors = ['#4475FD', '#FFBC53'];
    let faultPercentByTypeList = data;
    let faultPercentByTypeOption = {
      color: colors,
      legend: {
        data: faultPercentByTypeList.map(item => {
          return item.name;
        }),
        align: 'right',
        bottom: 0,
        right: 30,
        textStyle: {
          color: '#aaa',
          fontSize: 12
        },
        icon: 'react',
        itemHeight: 4,
        itemWidth: 22
      },
      grid: {
        top: 20
      },
      yAxis: [
        {
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(102, 102, 102, .2)'
            }
          },
          axisLabel: {
            formatter: '{value}k',
            color: 'rgba(51, 51, 51, .4)',
            // rotate: 30,
            margin: 1
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(102, 102, 102, .1)'
            }
          }
        }
      ],
      xAxis: [{
        boundaryGap: false,
        data: day,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(102, 102, 102, .2)'
          }
        },
        axisLabel: {
          color: 'rgba(51, 51, 51, .4)'
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(102, 102, 102, .1)'
          }
        }
      }],
      series: []
    };
    faultPercentByTypeOption.series = faultPercentByTypeList.map((item, i) => {
      return Object.assign({
        name: item.name,
        type: 'line',
        smooth: true,
        data: item.percents,
        // lineStyle: {
        //   color: colors[i],
        //   type: i === 0 ? 'dotted' : 'solid'
        // },
        itemStyle: {
          opacity: 0
        }
      }, i === 0 ? {
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.1,
              color: '#5682FE'
            }, {
              offset: 1,
              color: '#ffffff'
            }])
          }
        },
      } : {});
    });
    console.info(faultPercentByTypeOption);
    this.visitOption = faultPercentByTypeOption;
  }
}
