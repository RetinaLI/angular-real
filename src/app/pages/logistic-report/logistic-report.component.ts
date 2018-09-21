import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ILogisticReportData } from '../../services/data.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { IAccountIfAddData } from '../../components/account-if-add/account-if-add.interface';
import { IBarData } from '../../components/bar/bar.interface';
import { IProgressInterface } from '../../components/progress/progress.interface';
import { ISortListInterface } from '../../components/sort-list/sort-list.interface';
import { ISortInterface } from '../../components/sort/sort.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logistic-report',
  templateUrl: './logistic-report.component.html',
  styleUrls: ['./logistic-report.component.scss']
})
export class LogisticReportComponent implements OnInit {
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `物流大数据报告`,
    platform: '福田车联网平台'
  };
  accountIfAddData: IAccountIfAddData[];
  startShipData: IBarData[];
  plusData: any[] = [];
  minusData: any[] = [];
  total = 0;
  noStartShip3Data: ISortListInterface[] = [];
  progressScoreData: IProgressInterface[] = [];
  brandPoor3: string[] = [];
  logisticPoor3: string[] = [];

  // 排名3
  brandGood3Data: IProgressInterface[] = [];
  brandPoor3Data: string[] = [];
  departmentGood3Data: IProgressInterface[] = [];
  departmentPoor3Data: string[] = [];
  carrierGood3Data: ISortListInterface[] = [];
  carrierPoor3Data: string[];
  driverGood3Data: ISortInterface[] = [];
  driverPoor3Data: string[];

  // 运输情况
  transportConditionData: any[]

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    if(!this.dataService.reportData) return;
    let {
      title,
      platform,
      startDate,
      endDate,
      transportCondition,
      startShip,
      noStartShip3,
      progressData,
      brandPoor,
      brandGood3,
      brandPoor3,
      departmentGood3,
      departmentPoor3,
      carrierGood3,
      carrierPoor3,
      driverGood3,
      driverPoor3,
      accountIfAddData} = this.dataService.reportData as ILogisticReportData;

    this.bannerInfo = {
      title:`物流大数据${this.dataService.reportData.timeRangeType}报` ,
      platform,
      startDate,
      endDate,
      className: 'logistic-report'
    };
    this.accountIfAddData = accountIfAddData ;
    this.pageTitle.setTitle(this.bannerInfo.title);

    // 运输资源
    this.accountIfAddData.forEach( (val) => {
      let newAdd = val.number[1]-val.number[0];
      let arr = [];
      if (newAdd > 0) {
        arr.push(val.name);
        arr.push(newAdd);
        this.plusData.push(arr);
      } else if (newAdd < 0) {
        arr.push(val.name);
        arr.push(val.number[0]-val.number[1]);
        this.minusData.push(arr);
      }
    })

    // 运输概况
    this.transportConditionData = transportCondition;
    let total = 0;
    this.transportConditionData.forEach((val)=> {
      total += val.value;
    });
    this.total = total;

    // 起运情况
    this.startShipData = startShip;
    this.noStartShip3Data = noStartShip3;
    // console.log(this.startShipData);

    // 运输质量较好top3
    this.progressScoreData = progressData;


    // 品牌
    this.brandGood3Data = brandGood3;
    this.brandPoor3Data = brandPoor3;
    this.brandPoor3 = brandPoor;

    // 物流部
    this.departmentGood3Data = departmentGood3;
    this.departmentPoor3Data = departmentPoor3;

    //承运商
    this.carrierGood3Data = carrierGood3;
    this.carrierPoor3Data = carrierPoor3;

    // 司机
    this.driverGood3Data = driverGood3;
    this.driverPoor3Data = driverPoor3;

  }
}
