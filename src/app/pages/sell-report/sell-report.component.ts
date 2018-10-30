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
  public reportData: any = null;
  public ObjectKeys = Object.keys;
  public bannerInfo: ITopNavData = {
    title: '销售大数据报告',
    platform:'福田车联网平台',
    startDate: '',
    endDate: ''
  };
  public mapDataSell: IMapData[] = [
    {name: '', value: 0}
  ];
  public mapDataRepertory: IMapData[] = [];
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
      }
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
  public brandSellProvinceOrder = [];

  constructor(private dataService: DataService, private pageTitle: Title) {
    this.pageTitle.setTitle(this.bannerInfo.title);
  }
  async ngOnInit() {
    await this.dataService.getReportData();
    let _DATEFormat = FOTON_GLOBAL.Date.getDateByFormat;
    let reportData = this.dataService.reportData as ISellReportData;
    if(!reportData) return;
    this.reportData = reportData;
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
      startDate: _DATEFormat(reportDate.startDate, 'yyyy.MM.dd'),
      endDate: _DATEFormat(reportDate.endDate, 'yyyy.MM.dd')
    };
    this.pageTitle.setTitle(this.bannerInfo.title);
    // 车辆销售
    if(carSalesJson.mapList.length > 0) {
      let mapListConvert = this.convertArrJsonName(carSalesJson.mapList, 'province').sort((a, b) => b.value - a.value);
      mapListConvert = this.convertProvinceName(mapListConvert);
      this.mapDataSell = mapListConvert;
      this.parts.sell.detail.total = carSalesJson.totalNum;
      this.parts.sell.detail.firstProvince.name = mapListConvert[0].name;
      this.parts.sell.detail.firstProvince.value = mapListConvert[0].value;
      let brandOrder1 = ['欧曼', '欧马可', '奥铃', '时代', '欧辉', '雷萨'];
      this.brandSellProvinceOrder = brandOrder1.map(v => {
        let obj = {
          name: '',
          provinces: []
        };

        let item = saleRankJson.mapList.filter(a => a.brandOrType === v)[0];
        if (item) {
          obj.name = v;
          obj.provinces = item.provinceRank.sort((a, b) => b.value - a.value).slice(0, 3);
          return obj;
        } else {
          return null;
        }
      }).filter(v => v);
    }

    // 库存分布
    let arr = this.convertArrJsonName(stockCountJson.mapList, 'province').sort((a, b) => b.value - a.value);
    arr = this.convertProvinceName(arr);
    this.parts.repertory.detail.total = stockRankJson.total || 0;
    this.parts.repertory.detail.firstProvince = arr[0];
    this.parts.repertory.detail.lastProvince = arr[arr.length - 1];
    this.mapDataRepertory = arr;
    // chart data
    let brandOrder2 = ['欧曼', '欧马可', '奥铃', '瑞沃'];
    let covertData = this.convertArrJsonName(stockRankJson.mapList, 'brandOrType');
    let pieChartData = [];
    let othersObj = { name: '其他', value: 0};
    covertData.forEach(v => {
      if(brandOrder2.indexOf(v.name) > -1) {
        pieChartData.push(v);
      }else {
        othersObj.value += v.value;
      }
    });
    pieChartData.push(othersObj);   // 图标数据 完成
    this.parts.repertory.brandRepertoryRatyData = pieChartData;

     // 车联网实销情况
    this.parts.realSell.realSellRepertoryRatyData = {
      sell: {
        real: reportData.realSaleJson.mapList[0].totalNum,
        sham: reportData.realSaleJson.mapList[0].actualSalesNum,
        raty: (reportData.realSaleJson.mapList[0].actualSalesNum / reportData.realSaleJson.mapList[0].totalNum),
        weekAddActualNum: reportData.realSaleJson.mapList[2].weekAddActualNum,
        weekAddTotalNum: reportData.realSaleJson.mapList[2].weekAddTotalNum
      },
      repertory: {
        real: reportData.noSaleJson.mapList[0].totalNum,
        sham: reportData.noSaleJson.mapList[0].actualSalesNum,
        raty: (reportData.noSaleJson.mapList[0].actualSalesNum / reportData.noSaleJson.mapList[0].totalNum),
        weekAddActualNum: reportData.noSaleJson.mapList[2].weekAddActualNum,
        weekAddTotalNum: reportData.noSaleJson.mapList[2].weekAddTotalNum
      }
    }
    // 各品牌车联网实销情况
    let brandOrder3 = ['欧曼', '欧马可', '奥铃', '时代', '瑞沃', '雷萨'];
    let saleData = this.convertArrJsonName(reportData.realSaleInfoJson.mapList, 'brandOrType');
    let repertoryData = this.convertArrJsonName(reportData.noSaleInfoJson.mapList, 'brandOrType');
    let formatterData = [];
    brandOrder3.forEach(v => {
      let saleRaty = 0;
      let repertoryRaty = 0;
      let saleItem = saleData.find(x => x.name === v);
      let repertoryItem = repertoryData.find(x => x.name === v);
      saleRaty = saleItem.actualSalesNum/saleItem.totalNum;
      repertoryRaty = repertoryItem.actualSalesNum/repertoryItem.totalNum;
      formatterData.push({
        name: v,
        saleRaty,
        repertoryRaty
      })
    })
    this.parts.realSell.platformRealSell = formatterData;
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
