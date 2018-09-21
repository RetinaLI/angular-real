import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';

import { IMapData } from '../../components/map/map.interface';
import { ITopNavData } from '../../components/top-nav/top-nav.interface';
import { ISellReportData } from '../../services/data.interface';


@Component({
  selector: 'app-sell-report',
  templateUrl: './sell-report.component.html',
  styleUrls: ['./sell-report.component.scss']
})
export class SellReportComponent implements OnInit {
  public ObjectKeys = Object.keys;
  public bannerInfo: ITopNavData = {
    title: '销售大数据报告',
    platform:'福田车联网平台',
    startDate: '',
    endDate: ''
  };
  public mapDataSell: IMapData[] = [];
  public mapDataRepertory: IMapData[];
  public colors: string[] = ['#4475FD', '#3DE3A3', '#FFBC53', '#FFD94F', '#F56C6C'];
  public parts: {
    [x: string]: any
  } = {
    sell: {
      partNum: '01',
      partName: '车辆销售',
      detail: {
        total: 0,
        firstProvince: {
          name: '',
          value: 0
        }
      },
      brandSellProvinceOrder: {}
    },
    repertory: {
      partNum: '02',
      partName: '库存分布',
      detail: {
        total: 0,
        firstProvince: {
          name: '',
          value: 0
        },
        lastProvince: {
          name: '',
          value: 0
        }
      },
      // 各品牌库存占比
      brandRepertoryRatyData: []
    },
    realSell: {
      partNum: '03',
      partName: '实销情况',
      // 实销、库存的虚假占比
      realSellRepertoryRatyData: {
        sell: {
          real: 0,
          sham: 0,
          raty: 0
        },
        repertory: {
          real: 0,
          sham: 0,
          raty: 0
        }
      },
      // 各品牌车联网实销情况
      platformRealSell: [],
      maxNum: 0
    }
  }
  public brandSellProvinceOrder: {
    name: string,
    provinces: string[]
  }[] = [];

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }
  async ngOnInit() {
    await this.dataService.getReportData();
    let _DATEFormat = FOTON_GLOBAL.Date.getDateByFormat;
    let reportData = this.dataService.reportData as ISellReportData;
    if(!reportData) return;
    let {
      title,
      platform,
      reportDate,
      saleRankJson,
      carSalesJson,
      stockCountJson,
      stockRankJson
    } = reportData as ISellReportData;
    // banner
    this.bannerInfo = {
      title: `销售大数据${reportData.timeRangeType}报`,
      platform,
      startDate: _DATEFormat(reportDate.startDate, 'yyyy-MM-dd'),
      endDate: _DATEFormat(reportDate.endDate, 'yyyy-MM-dd')
    };
    this.pageTitle.setTitle(this.bannerInfo.title);
    // 车辆销售
    let mapListConvert = this.convertArrJsonName(carSalesJson.mapList, 'province').sort((a, b) => b.value - a.value);
    mapListConvert = this.convertProvinceName(mapListConvert);
    this.mapDataSell = mapListConvert;
    this.parts.sell.detail.total = carSalesJson.totalNum;
    this.parts.sell.detail.firstProvince.name = mapListConvert[0].name;
    this.parts.sell.detail.firstProvince.value = mapListConvert[0].value;
    this.brandSellProvinceOrder = saleRankJson.mapList.map((v, i) => {
      let arr = v.provinceRank.sort((m, n) => n.value - m.value).slice(0, 3);
      let provinces = arr.map(v => v.province) as string[];
      return {
        name: v.brandOrType,
        provinces
      }
    });
    // 库存分布
    let arr = this.convertArrJsonName(stockCountJson.mapList, 'province').sort((a, b) => b.value - a.value);
    arr = this.convertProvinceName(arr);
    this.parts.repertory.detail.firstProvince = arr[0];
    this.parts.repertory.detail.lastProvince = arr[arr.length - 1];
    // this.mapDataRepertory = [arr[0], arr[arr.length - 1]];
    this.mapDataRepertory = arr;
    // chart data
    let pieChartData = this.convertArrJsonName(stockRankJson.mapList, 'brandOrType');
    let others = pieChartData.sort((a, b) => b.value - a.value).splice(4);
    let othersObj = { name: '其他', value: 0};
    let othersSum = 0;
    others.forEach(v => othersSum += v.value);
    othersObj.value = othersSum;
    pieChartData.push(othersObj);   // 图标数据 完成
    this.parts.repertory.brandRepertoryRatyData = pieChartData;

     // 车联网实销情况
    this.parts.realSell.realSellRepertoryRatyData = {
      sell: {
        real: reportData.realSaleJson.mapList[0].totalNum,
        sham: reportData.realSaleJson.mapList[0].actualSalesNum,
        raty: (reportData.realSaleJson.mapList[0].actualSalesNum / reportData.realSaleJson.mapList[0].totalNum)
      },
      repertory: {
        real: reportData.noSaleJson.mapList[0].totalNum,
        sham: reportData.noSaleJson.mapList[0].actualSalesNum,
        raty: (reportData.noSaleJson.mapList[0].actualSalesNum / reportData.noSaleJson.mapList[0].totalNum)
      }
    }

    let numArr = []; // 存放所有的数值
    let repertoryDataList = reportData.noSaleInfoJson.mapList;
    let formatterData = reportData.realSaleInfoJson.mapList.map(v => {
      let name = v.brandOrType;
      let ind = repertoryDataList.findIndex(x => x.brandOrType === name);
      if(ind > -1) {
        let sellRaty = v.actualSalesNum/v.totalNum;
        numArr.push(sellRaty);
        let obj = repertoryDataList.splice(ind, 1);
        let repertoryRaty = obj[0].actualSalesNum/obj[0].totalNum || 0;
        numArr.push(sellRaty, repertoryRaty);
        return {
          name,
          sellRaty,
          repertoryRaty
        }
      } else {
        // realSaleInfoJson 比noSaleInfoJson 的项数多的时候，只取他们都有的项
        return '';
      }
    });
    this.parts.realSell.platformRealSell = formatterData;
    this.parts.realSell.maxNum = Math.max(...numArr);
  }
  // 改字段名
  convertArrJsonName(json: {}[], oldName: string, newName: string = 'name') {
    return JSON.parse(JSON.stringify(json).replace(eval(`/${oldName}/g`), newName));
  }
  // 改省份名
  convertProvinceName(data: {}[]) {
    return JSON.parse(JSON.stringify(data).replace(eval(`/[省|市|自治区|壮族自治区|回族自治区|维吾尔自治区|特别行政区]/g`), ''));
  }
}
