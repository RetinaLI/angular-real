import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { ILogisticReportData, ISellReportData, IServeReportData, IQeReportData, IProductData, ReportTimeRangeType, IReportData } from './data.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  reportData: IReportData | ILogisticReportData | ISellReportData | IServeReportData | IQeReportData | IProductData;

  private apiUrl: string = '';

  chinaJson: {
    [x: string]: any
  } = {};

  constructor(private ajaxService: AjaxService, private route: ActivatedRoute) {
    let search = document.location.search;
    if(!search || search.length === 0) return;
    let dataSearch = search.replace('?', '').split('&').find(e => e.indexOf('data=') === 0);
    dataSearch = dataSearch.substr(dataSearch.indexOf('=') + 1);
    this.apiUrl = decodeURIComponent(dataSearch);
    console.info(this.apiUrl);
  }

  async getReportData(params?: any) {
    if (!this.apiUrl || this.reportData) return;
    let result = await this.ajaxService.get(this.apiUrl, params);
    let days = [];

    if (!result || result.success === false) {
      return;
    }

    this.reportData = result as (IReportData | ILogisticReportData | ISellReportData | IServeReportData | IQeReportData | IProductData);

    if(this.reportData.reportDate && this.reportData.reportDate.startDate &&  this.reportData.reportDate.endDate) {
      this.reportData.startDate = this.reportData.reportDate.startDate;
      this.reportData.endDate = this.reportData.reportDate.endDate;
    }

    this.reportData.typeLabel = this.reportData.type === 'carBrand' ? '品牌' : '车型';

    let startTime = new Date(FOTON_GLOBAL.Date.getDateByFormat(this.reportData.startDate)).getTime();
    let endTime = new Date(FOTON_GLOBAL.Date.getDateByFormat(this.reportData.endDate)).getTime();

    this.reportData.startDate = FOTON_GLOBAL.Date.getDateByFormat(this.reportData.startDate, 'yyyy.MM.dd');
    this.reportData.endDate = FOTON_GLOBAL.Date.getDateByFormat(this.reportData.endDate, 'yyyy.MM.dd');
    this.reportData.timeRangeType = endTime - startTime > 7 * 24 * 60 * 60000 ? ReportTimeRangeType.MONTH : ReportTimeRangeType.WEEK;

    if (this.reportData.timeRangeType === ReportTimeRangeType.MONTH) {
      let endDay = +FOTON_GLOBAL.Date.getDateByFormat(endTime, 'dd');
      days = '1'.repeat(endDay).split('').map((e, i) => i + 1);
    } else {
      days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    }
    this.reportData.days = days;
  }

  async getChinaJson() {
    let result = await this.ajaxService.get('assets/json/china.json', null);
    this.chinaJson = result;
  }
}
