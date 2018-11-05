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
  reportData: ILogisticReportData;
  bannerInfo: ITopNavData = {
    endDate: '',
    startDate: '',
    title: `物流大数据周报`,
    platform: '福田车联网平台'
  };
  accountIfAddData: IAccountIfAddData[];

  totalYundanM: Number;
  startRateM: Number;
  endRateM: Number;

  plusData: any[] = [];
  minusData: any[] = [];
  noStartShip3Data: ISortListInterface[] = [];
  delayEndCouncilsRank: ISortListInterface[] = [];
  abMileageCouncilsRank: ISortListInterface[] = [];
  doubtDistCouncilsRank: ISortListInterface[] = [];
  delayBeginCountData: IBarData[] = [];
  delayEndCountData: IBarData[] = [];
  abMileageCountData: IBarData[] = [];
  doubtDistCountData: IBarData[] = [];

  // 运输评价
  brandGood3Data: IProgressInterface[] = [];
  brandPoor3Data: string[] = [];
  departmentGood3Data: IProgressInterface[] = [];
  departmentPoor3Data: string[] = [];
  carrierGood3Data: ISortListInterface[] = [];
  carrierPoor3Data: string[] = [];
  driverGood3Data: ISortInterface[] = [];
  driverPoor3Data: string[] = [];

  // 运输情况
  transportConditionData: any[]
  addData = {
    total: 0,
    totalAddNum: 0,
    ontimeBeginRate: 0,
    ontimeEndRate: 0,
    beginRateAdd: 0,
    endRateAdd: 0
  }

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }

  async ngOnInit() {
    await this.dataService.getReportData();
    let dateFormate = FOTON_GLOBAL.Date.getDateByFormat;
    this.reportData = this.dataService.reportData as ILogisticReportData;

    if(!this.reportData) return;

    // 运输质量评价
    let qe = this.reportData.transportationQualityEvaluation;
    // 品牌
    qe.brandGradeTop3.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.brandName;
      placeHolder.progress = val.brandGrade + '';
      this.brandGood3Data.push(placeHolder);
    });
    qe.brandGradeLast3.forEach((val) => {
      this.brandPoor3Data.push(val.brandName);
    })
    // 物流部
    qe.orgGradeTop3.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.orgName;
      placeHolder.progress = val.orgGrade + '';
      this.departmentGood3Data.push(placeHolder);
    });
    qe.orgGradeLast3.forEach((val) => {
      this.departmentPoor3Data.push(val.orgName);
    })
    // 承运商
    qe.councilsGradeTop3.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.councilsGrade + '';
      this.carrierGood3Data.push(placeHolder);
    });
    qe.councilsGradeLast3.forEach((val) => {
      this.carrierPoor3Data.push(val.councilsName);
    })
    // 司机
    qe.driverGradeTop3.forEach((val) =>{
      let placeHolder = {
        title: '',
        progress: ''
      };
      placeHolder.title = val.driverName;
      placeHolder.progress = val.driverGrade + '';
      this.driverGood3Data.push(placeHolder);
    });
    qe.driverGradeLast3.forEach((val) => {
      this.driverPoor3Data.push(val.driverName);
    })

    this.bannerInfo = {
      title:`物流大数据${this.dataService.reportData.timeRangeType}报` ,
      platform: '福田车联网平台',
      startDate: dateFormate(this.reportData.startDate, 'yyyy.MM.dd'),
      endDate: dateFormate(this.reportData.endDate, 'yyyy.MM.dd'),
      className: 'logistic-report'
    };

    this.pageTitle.setTitle(this.bannerInfo.title);

    // 运输资源

    let transResource = this.reportData.transportResources;
    let arr = new Array(6);
    /* todo 添加else */
    for ( let k in transResource) {
      let frame = {
        name: '',
        number: []
      }
      if (k == 'companyBranchNum') {
        frame.name = "分公司(家)";
        frame.number = transResource[k];
        arr[0] = frame;
      } else if (k == 'logDepartmentNum') {
        frame.name = "物流部(个)";
        frame.number = transResource[k];
        arr[1] = frame;
      } else if (k == 'councilsNum') {
        frame.name = "承运商(家)";
        frame.number = transResource[k];
        arr[2] = frame;
      } else if (k == 'driverNum') {
        frame.name = "司机(名)";
        frame.number = transResource[k];
        arr[3] = frame;
      } else if (k == 'transportRouteNum') {
        frame.name = "运输路线(条)";
        frame.number = transResource[k];
        arr[4] = frame;
      } else if (k == 'placepointNum') {
        frame.name = "位置标点(个)";
        frame.number = transResource[k];
        arr[5] = frame;
      }
    };
    this.accountIfAddData = arr;
    this.accountIfAddData.forEach( (val) => {
      let newAdd = val.number[1];
      let arr = [];
      if (newAdd > 0) {
        arr.push(val.name.slice(0,-3));
        arr.push(newAdd + val.name.slice(-2,-1));
        this.plusData.push(arr);
      }
    });

    // 运输概况
    this.addData.total = this.reportData.transportSituation.lastWeekTransportSituation.allOrder;
    let pieData = [
      {
        name: "待调度",
        value: 0
      },
      {
        name: "已发车",
        value: 0
      },
      {
        name: "已到达",
        value: 0
      },
      {
        name: "异常运单",
        value: 0
      }
    ]
    let lastPie = this.reportData.transportSituation.lastWeekTransportSituation;
    pieData[0].value = lastPie.waitScheNum;
    pieData[1].value = lastPie.onroadNum;
    pieData[2].value = lastPie.arriveNum;
    pieData[3].value = lastPie.abnormalNum;
    this.transportConditionData = pieData;
    let weekBefore = this.reportData.transportSituation.weekBeforeTransportSituation;

    // 运单总数增加
    // totalYundanM: Boolean;
    // startRateM: Boolean;
    // endRateM: Boolean;
    if (lastPie.allOrder > weekBefore.allOrder) {
      this.totalYundanM = 1;
      this.addData.totalAddNum = lastPie.allOrder - weekBefore.allOrder;
    } else if (lastPie.allOrder < weekBefore.allOrder) {
      this.totalYundanM = -1;
      this.addData.totalAddNum =  weekBefore.allOrder - lastPie.allOrder;
    } else {
      this.totalYundanM = 0;
      this.addData.totalAddNum = 0;
    }

    let rate1 = lastPie.ontimeBeginRate.substr(0, lastPie.ontimeBeginRate.indexOf('%'));
    let rate2 = weekBefore.ontimeBeginRate.substr(0, weekBefore.ontimeBeginRate.indexOf('%'));

    // 及时起运率
    this.addData.ontimeBeginRate = Number(rate1);
    // 及时起运率上涨or下降
    this.addData.beginRateAdd = (Number(rate1) - Number(rate2));
    if ( Number(rate1) > Number(rate2)) {
      this.startRateM = 1;
      this.addData.beginRateAdd = Number(this.accSub(rate1, rate2));
    } else if ( Number(rate1) < Number(rate2) ) {
      this.startRateM = -1;
      this.addData.beginRateAdd = Number(this.accSub(rate2, rate1));
    } else {
      this.startRateM = 0;
      this.addData.beginRateAdd = 0;
    }

    let rate3 = lastPie.ontimeEndRate.substr(0, lastPie.ontimeEndRate.indexOf('%'));
    let rate4 = weekBefore.ontimeEndRate.substr(0, weekBefore.ontimeEndRate.indexOf('%'));
    // 及时送达率
    this.addData.ontimeEndRate = Number(rate3);
    // 及时送达率上涨or下降
    if ( Number(rate3) > Number(rate4)) {
      this.endRateM = 1;
      this.addData.endRateAdd = Number(this.accSub(rate3, rate4));
    } else if ( Number(rate3) < Number(rate4) ) {
      this.endRateM = -1;
      this.addData.endRateAdd = Number(this.accSub(rate4, rate3));
    } else {
      this.endRateM = 0;
      this.addData.endRateAdd = 0;
    }

    // 异常运输
    let ab = this.reportData.abnormalTransportation;
    /* todo 用reportData.days代替 */
    let oneWeek7 = this.reportData.days;

    // 异常运输-起运
    let arr1 = [];
    ab.delayBeginCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr1.push(placeHolder);
    })
    this.delayBeginCountData = arr1;

    this.noStartShip3Data = ab.delayBeginCouncilsRank.map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.delayBeginRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.delayBeginCount;
      return placeHolder;
    })
    //异常运输-送达
    let arr2 = [];
    ab.delayEndCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr2.push(placeHolder);
    })
    this.delayEndCountData = arr2;
    this.delayEndCouncilsRank = ab.delayEndCouncilsRank.map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.delayEndRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.delayEndCount;
      return placeHolder;
    })
    //异常运输-里程
    let arr3 = [];
    ab.abMileageCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr3.push(placeHolder);
    })
    this.abMileageCountData = arr3;
    this.abMileageCouncilsRank = ab.abMileageCouncilsRank.map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.abMileageRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.abMileageCount;
      return placeHolder;
    })

    //异常运输-配货
    let arr4 = [];
    ab.doubtDistCount.forEach((val, index) => {
      let placeHolder: {
        date: string | number,
        number: any[]
      } = {date: '', number: []}
      placeHolder.date = oneWeek7[index];
      placeHolder.number[0] = val[1];
      placeHolder.number[1] = val[2];
      arr4.push(placeHolder);
    })
    this.doubtDistCountData = arr4;

    this.doubtDistCouncilsRank = ab.doubtDistCouncilsRank.map( (val) => {
      let placeHolder = {title: '', progress: '', note: 0, errNote: 0 };
      placeHolder.title = val.councilsName;
      placeHolder.progress = val.doubtDistRate + '';
      placeHolder.note = val.totalNum;
      placeHolder.errNote = val.doubtDistCount;
      return placeHolder;
    })
  }

  accSub (arg1, arg2) {
    let r1, r2, m, n;
    try {r1 = arg1.split('.')[1].length} catch (e) {r1 = 0};
    try {r2 = arg2.split('.')[1].length} catch (e) {r2 = 0};
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1: r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
  }
}
