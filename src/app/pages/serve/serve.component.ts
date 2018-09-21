import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';
import { IAccountIfAddData } from '../../components/account-if-add/account-if-add.interface';
import { IPieData } from '../../components/pie/pie.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { IImgTextSheetsData } from '../../components/img-text-sheets/img-text-sheets.interface';
import { IServeReportData } from '../../services/data.interface';

@Component({
  selector: 'app-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.scss']
})
export class ServeComponent implements OnInit {
  reportData: IServeReportData;
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `服务大数据报告`,
    platform: '福田车联网平台'
  };
  summaryData: IAccountIfAddData[] = [];
  pieData: IPieData[];
  sheetsList: IImgTextSheetsData[];

  enterPart = {
    brandCarEnterTotal: []
  };
  truePart = {
    trueScale: [],
    color: ['#3DE3A3', '#FFBC53', '#ADADAD'],
    trueInfo: {},
    facticityList: []
  };
  falsePart = {
    falseData: []
  };
  activePart = {
    activeInfo: {
      sendTotal: 0
    },
    activeList: []
  }

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    this.reportData = this.dataService.reportData as IServeReportData;

    if(!this.reportData) return;

    this.bannerInfo.endDate = this.reportData.endDate;
    this.bannerInfo.startDate = this.reportData.startDate;
    this.bannerInfo.title = `服务大数据${this.reportData.timeRangeType}报`;
    this.pageTitle.setTitle(this.bannerInfo.title);

    let summaryData = [];
    summaryData.push({
      name: '进站总次数',
      number: this.reportData.enterInfo.inboundCount
    },{
      name: '涉及车辆数',
      number: this.reportData.enterInfo.vehicleCount
    },{
      name: '平均进站时长(h)',
      number: this.reportData.enterInfo.avgInboundTime
    });
    this.summaryData = summaryData;

    this.enterPart.brandCarEnterTotal = this.reportData.brandCarEnterTotal;
    let otherServeNum = this.reportData.trueInfo.totalNum - this.reportData.trueInfo.realNum - this.reportData.trueInfo.notRealNum;

    this.truePart.trueScale.push(
      {name: "真实", value: this.reportData.trueInfo.realNum},
      {name: "不真实", value: this.reportData.trueInfo.notRealNum},
      {name: "无法判断", value: otherServeNum}
    )

    this.truePart.facticityList.push({
      img: require('../../../assets/images/serve/true-icon1.png'),
      title: "服务总数(单)",
      num: this.reportData.trueInfo.totalNum
    },
    {
      img: require('../../../assets/images/serve/true-icon2.png'),
      title: "真实服务单",
      num: this.reportData.trueInfo.realNum
    },
    {
      img: require('../../../assets/images/serve/true-icon3.png'),
      title: "不真实服务单",
      num: this.reportData.trueInfo.notRealNum
    },
    {
      img: require('../../../assets/images/serve/true-icon4.png'),
      title: "无法判断服务单",
      num: otherServeNum
    })

    this.falsePart.falseData = this.reportData.falseData.map(item => {
      return {
        title: item.brandName,
        progress: item.notRealNum/this.reportData.trueInfo.notRealNum*100
      }
    })

    this.activePart.activeInfo.sendTotal = this.reportData.activeInfo.sendTotal

    this.activePart.activeList.push({
      img: require('../../../assets/images/serve/active-icon1.png'),
      title: "已派单",
      num: this.reportData.activeInfo.sendSing
    },
    {
      img: require('../../../assets/images/serve/active-icon2.png'),
      title: "处理完成",
      num: this.reportData.activeInfo.resolve
    })
  }
}
