import { IMapData } from '../components/map/map.interface';
import { IBarData } from '../components/bar/bar.interface';
import { IProgressInterface } from '../components/progress/progress.interface';
import { ISortListInterface } from '../components/sort-list/sort-list.interface';
import { ISortInterface } from '../components/sort/sort.interface';
import { IAccountIfAddData } from '../components/account-if-add/account-if-add.interface';

export enum ReportTimeRangeType {WEEK = '周', MONTH = '月', YEAR = '年'};

export interface IReportData {
  title: string,
  platform: string,
  reportDate?: {
    startDate: string,
    endDate: string,
  },
  timeRangeType?: ReportTimeRangeType,
  days?: (number | string)[],
  startDate?: string,    // delete later
  endDate?: string     // delete later
}


/**
* 物流数据结构
*/
export interface ILogisticReportData extends IReportData {
  accountIfAddData?: IAccountIfAddData[],
  transportCondition?: IMapData[],
  startShip?: IBarData[],
  noStartShip3: ISortListInterface[],
  progressData: IProgressInterface[],
  brandGood3: IProgressInterface[],
  brandPoor3: string[],
  departmentGood3: IProgressInterface[],
  departmentPoor3: string[],
  carrierGood3: ISortListInterface[],
  carrierPoor3: string[],
  driverGood3: ISortInterface[],
  driverPoor3: string[],
  brandPoor: string[],
  logisticPoor3: string[]
}

/**
* 销售数据结构
*/
export interface ISellReportData extends IReportData {
  carSalesJson?: {    // 车辆销售数据
    mapList: {}[],
    totalNum: number,
    [x: string]: any
  },
  totalSales?: number,
  saleRankJson?: {    // 各品牌车辆库存占比
    mapList?: {[x: string]: any}[]
  },
  stockCountJson?: {    // 库存分布
    mapList?: {
      province: string,
      value: number
    }[],
    total?: number
  },
  stockRankJson: {  // 各品牌库存占比
    mapList?: {
      brandOrType: string,
      value: number
    }[],
    total: number
  },
  noSaleJson: {
    mapList?: {[x: string]: any}[]
  },
  realSaleJson: {
    mapList?: {[x: string]: any}[]
  },
  noSaleInfoJson: {
    mapList?: {[x: string]: any}[]
  },
  realSaleInfoJson: {
    mapList?: {[x: string]: any}[]
  }
}

/**
 * 服务数据结构
 */
export interface IServeReportData extends IReportData {
  enterInfo: {
    inboundCount: number[],
    vehicleCount: number[],
    avgInboundTime: number[]
  },
  brandCarEnterTotal: {}[],
  trueInfo: {
    totalNum: number,
    realNum: number,
    notRealNum: number
  },
  falseData: [
    {
      brandName: string,
      notRealNum: number
    }
  ],
  activeInfo: {
    sendTotal: number,
    sendSing: number,
    resolve: number
  }
}

/**
 * 质量报告数据结构
 */
export interface IFaultPercentByLevelAndTypeItem {
  name: string,
  percents: number[]
}
export interface IFaultCountItem {
  name: string,
  count: number
}
export interface IFaultTopOneByTypeItem {
  name: string,
  faultName: string,
  percent: number
}
export interface IFaultPercentByTypeItem {
  name: string,
  percents: number[]
}
export interface IQeReportData extends IReportData {
  summary: {
    total: number,
    car: number,
    perByCar: number,
    sumMileage: number,
    perBy1000: number
  },
  orderByFaultTypeData: {
    name: string,
    value: number
  }[],
  faultByBrandList: IFaultPercentByLevelAndTypeItem[],
  faultPercentByTypeList: IFaultPercentByTypeItem[],
  faultCountList: IFaultCountItem[],
  faultTopOneByTypeList: IFaultTopOneByTypeItem[],
  faultFixSummary: {
    total: number,
    open: number,
    hasOwner: number,
    fix: number,
    toSIBEL: number
  }
}

/**
 * 用户使用大数据周报
 */
export interface IProductData extends IReportData {
  accountIfAddData: [
    {
      name: string,
      number: number[],
      addValue?: string
    }
  ],
  sortList: [{
    title: string,
    progress: string
  }],
  visitList: [{
    title: string,
    progress: string,
    lift: string
  }],
  listSort: [{
    title: string,
    progress: string,
    lift: string
  }],
  dealerList: [{
    title: string,
    progress: string,
    lift: string
  }],
  dealerScale: [{
    value: number,
    name: string
  }],
  parkScale: [{
    value: number,
    name: string
  }],
  comPieData: [{
    value: number,
    name: string,
    title: string,
    num: number
  }],
  dealerPieData: [{
    value: number,
    name: string,
    title: string,
    num: number
  }],
  parkList: [{
    title: string,
    progress: string,
    lift: string
  }],
  sortTopList: [{
    title: string,
    progress: string,
    lift: string
  }],
  visitChartData: [{
    name: string,
    percents: any
  }]
}
