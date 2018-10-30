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
  trueScale: IPieData[] = [];
  sheetsList: IImgTextSheetsData[];

  enterPart = {
    brandCarEnterTotal: []
  };
  truePart = {
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

    //进站统计
    let summaryData = [];
    summaryData.push({
      name: '进站总次数(次)',
      number: this.reportData.optionWeekInboundInfo.totalJson.inFenceCount
    },{
      name: '涉及车辆数(辆)',
      number: this.reportData.optionWeekInboundInfo.totalJson.vehicleCount
    },{
      name: '平均进站时长(h)',
      number: this.reportData.optionWeekInboundInfo.totalJson.avgInFenceTime
    });
    this.summaryData = summaryData;

    // this.enterPart.brandCarEnterTotal = this.reportData.optionWeekInboundInfo.brandJSONArray;

    let orderBrandTotal = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃']
    let elseBrand = [];
    orderBrandTotal.map((value, index) => {
      this.reportData.optionWeekInboundInfo.brandJSONArray.map((item, key) => {
        if(item.brandName === value) {
          this.enterPart.brandCarEnterTotal.push(item)
        } 
      })
    })
    let vehicleCount = 0, inFenceCount = 0, hoursTotle = 0;
    let arr = [];
    this.reportData.optionWeekInboundInfo.brandJSONArray.map((item, key) => {
      if(orderBrandTotal.indexOf(item.brandName) == -1) {
        arr.push(item)
        inFenceCount += item.inFenceCount;
        vehicleCount += item.vehicleCount;
        hoursTotle += item.avgInFenceTime * item.vehicleCount
      }
    })
    elseBrand.push({
      brandName: '其他',
      inFenceCount: inFenceCount,
      vehicleCount: vehicleCount,
      avgInFenceTime: (hoursTotle/vehicleCount).toFixed(2)
    })
    this.enterPart.brandCarEnterTotal = this.enterPart.brandCarEnterTotal.concat(elseBrand)

    //服务真实性
    let otherServeNum = this.reportData.optionWeekTruthInfo.truthInfo.totalNum - this.reportData.optionWeekTruthInfo.truthInfo.realNum - this.reportData.optionWeekTruthInfo.truthInfo.notRealNum;

    let trueScale = [];
    trueScale.push(
      {name: "真实", value: this.reportData.optionWeekTruthInfo.truthInfo.realNum},
      {name: "不真实", value: this.reportData.optionWeekTruthInfo.truthInfo.notRealNum},
      {name: "无法判断", value: otherServeNum}
    )
    this.trueScale = trueScale;

    this.truePart.facticityList.push({
      img: require('../../../assets/images/serve/true-icon1.png'),
      title: "服务总数(单)",
      num: this.reportData.optionWeekTruthInfo.truthInfo.totalNum
    },
    {
      img: require('../../../assets/images/serve/true-icon2.png'),
      title: "真实服务单",
      num: this.reportData.optionWeekTruthInfo.truthInfo.realNum
    },
    {
      img: require('../../../assets/images/serve/true-icon3.png'),
      title: "不真实服务单",
      num: this.reportData.optionWeekTruthInfo.truthInfo.notRealNum
    },
    {
      img: require('../../../assets/images/serve/true-icon4.png'),
      title: "无法判断服务单",
      num: otherServeNum
    })

    let orderFalseData = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃'];
    orderFalseData.map((value, index) => {
      this.reportData.optionWeekTruthInfo.truthInfoByBrand.map((item, key) => {
        if(item.brandName === value) {
          this.falsePart.falseData.push({
            title: item.brandName,
            progress: item.brandNotRealNum/item.brandTotalNum*100
          })
        }
      })
    });

    //主动服务
    this.activePart.activeInfo.sendTotal = this.reportData.loadWeekTroubleshooting.troubleshooting.totalpushed

    this.activePart.activeList.push({
      img: require('../../../assets/images/serve/active-icon1.png'),
      title: "已派单",
      num: this.reportData.loadWeekTroubleshooting.troubleshooting.assigne
    },
    {
      img: require('../../../assets/images/serve/active-icon2.png'),
      title: "处理完成",
      num: this.reportData.loadWeekTroubleshooting.troubleshooting.processed
    })
  }
}
