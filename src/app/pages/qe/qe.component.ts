import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IQeReportData, IFaultPercentByLevelAndTypeItem } from '../../services/data.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { IAccountIfAddData } from '../../components/account-if-add/account-if-add.interface';
import { IPieData } from '../../components/pie/pie.interface';
import { IProgressInterface } from '../../components/progress/progress.interface';
import { IImgTextSheetsData } from '../../components/img-text-sheets/img-text-sheets.interface';
import { Title } from '@angular/platform-browser';

interface IViewFaultPercentByType {
  highSize: number,
  middleSize: number,
  lowSize: number,
  highSizeColor: string,
  middleSizeColor: string,
  lowSizeColor: string
};

@Component({
  selector: 'app-qe',
  templateUrl: './qe.component.html',
  styleUrls: ['./qe.component.scss']
})
export class QeComponent implements OnInit {
  reportData: IQeReportData;
  bannerInfo: ITopNavData = {
    className: 'qe',
    endDate: '',
    startDate: '',
    title: `质量大数据报告`,
    platform: '福田车联网平台'
  };
  summaryData: IAccountIfAddData[] = [];
  orderByFaultTypeData: IPieData[] = [];
  orderByFaultTypeList: {
    name: string,
    color: string,
    value: number
  }[] = [];
  orderByFaultTypeChartColors: string[] = ['#4475FD', '#3DE3A3', '#FFBC53', '#FFD94F', '#F27819', '#ED668C', '#9366ED', '#66BEED', '#2D19B9', '#C50F4B'];
  orderByFaultTypeChartGrid = {
    top: 0,
    bottom: 0
  };
  faultByBrandList: IViewFaultPercentByType[] = [];
  faultByBrandColors: {
    label: string,
    color: string
  }[] = [
      { label: '高', color: '#FFBC53' },
      { label: '中', color: '#4475FD' },
      { label: '低', color: '#3DE3A3' },
    ];

  faultCountList: IProgressInterface[] = [];

  faultFixList: IImgTextSheetsData[] = [];

  faultTopOneByTypeList: IProgressInterface[] = []

  faultPercentByTypeOption: any;

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    this.reportData = this.dataService.reportData as IQeReportData;

    if(!this.reportData) return;

    this.bannerInfo.endDate = this.reportData.endDate;
    this.bannerInfo.startDate = this.reportData.startDate;
    this.bannerInfo.title = `质量大数据${this.reportData.timeRangeType}报`;
    this.pageTitle.setTitle(this.bannerInfo.title);

    let summaryData = [];
    summaryData.push({
      name: '故障总数（次）',
      number: [this.reportData.summary.total]
    },{
      name: '故障车辆(台)',
      number: [this.reportData.summary.car]
    },{
      name: '台均故障(次)',
      number: [this.reportData.summary.perByCar]
    },{
      name: '行驶总里程(公里)',
      number: [this.reportData.summary.sumMileage]
    },{
      name: '千公里故障(次)',
      number: [this.reportData.summary.perBy1000]
    });
    this.summaryData = summaryData;

    this.orderByFaultTypeData = this.reportData.orderByFaultTypeData;
    this.orderByFaultTypeList = this.reportData.orderByFaultTypeData.map((item, i) => {
      return { ...item, color: this.orderByFaultTypeChartColors[i] }
    });

    this.faultByBrandList = this.reportData.faultByBrandList.map(item => {
      return Object.assign(item, {
        highSize: item.percents[0],
        middleSize: item.percents[1],
        lowSize: item.percents[2],
        highSizeColor: this.faultByBrandColors[0].color,
        middleSizeColor: this.faultByBrandColors[1].color,
        lowSizeColor: this.faultByBrandColors[2].color
      });
    });

    this.faultCountList = this.reportData.faultCountList.map(item => {
      return {
        title: item.name,
        progress: item.count + ''
      };
    });

    this.faultFixList.push({
      title: '故障总数',
      img: require('../../../assets/images/quality/icon-all@2x.png'),
      num: this.reportData.faultFixSummary.total
    }, {
        title: '待处理',
        img: require('../../../assets/images/quality/icon-pending@2x.png'),
        num: this.reportData.faultFixSummary.open
      }, {
        title: '已分发',
        img: require('../../../assets/images/quality/icon-allot@2x.png'),
        num: this.reportData.faultFixSummary.hasOwner
      }, {
        title: '处理完成',
        img: require('../../../assets/images/quality/icon-done@2x.png'),
        num: this.reportData.faultFixSummary.fix
      });

    this.faultTopOneByTypeList = this.reportData.faultTopOneByTypeList.map(item => {
      return {
        title: item.name,
        progress: item.percent + '',
        problem: item.faultName
      }
    });
    this.bindFaultPercentByTypeList();
  }

  bindFaultPercentByTypeList() {
    let colors = ['#666666', '#4475FD', '#3DE3A3', '#FFBC53', '#F56C6C', '#FFD94F'];
    let faultPercentByTypeList = this.reportData.faultPercentByTypeList;
    let faultPercentByTypeOption = {
      color: colors,
      legend: {
        data: faultPercentByTypeList.map(item => {
          return item.name;
        }),
        bottom: 0,
        left: 'center',
        textStyle: {
          color: '#aaa',
          fontSize: 12
        },
        icon: 'circle',
        itemHeight: 6,
        itemWidth: 8
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
            formatter: '{value}%',
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
        }
      ],
      xAxis: [{
        boundaryGap: false,
        data: this.reportData.days,
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
        data: item.percents,
        lineStyle: {
          color: colors[i],
          type: i === 0 ? 'dotted' : 'solid'
        },
        itemStyle: {
          opacity: 0
        }
      }, i === 0 ? {
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.3,
              color: '#AAAAAA'
            }, {
              offset: 1,
              color: '#FFFFFF'
            }])
          }
        },
      } : {});
    });
    this.faultPercentByTypeOption = faultPercentByTypeOption;
  }

  trackByOrderByFaultTypeList(index: number, data: IPieData): number {
    return index;
  }

  trackByFaultByBrandList(index: number, data: IFaultPercentByLevelAndTypeItem): string {
    return data.name;
  }

  trackByFaultByBrandColors(index: number, data: any): number {
    return index;
  }

}
