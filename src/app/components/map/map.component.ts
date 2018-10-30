import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IMapData } from './map.interface';
import { $BLUE, $YELLOW } from '../../../global.variable';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() mapData: IMapData[] = [];
  @Input() name: string;

  private themes = {
    sell: {
      color: ['#ECF1FF', '#89A7FE'],
      areaColor: '#EDF2FF',
      markPointColor: $BLUE,
      markPointLabelColor: $BLUE,
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABT1JREFUWAmtV89rXFUYfW+SjNH8gCqSlNaqECykUkERNAs3WdhFqAuNi4oYl9lnK9K9BNd20erChT8W/kDrPxAEQTDYQrWtaBJM3ATya5OZPL/z5p2X8+7c++a9SS7cft893/nOd+bOvM4kjk624j7bkz77ojoD63D78VPpRVQxUYXTj8FQT6nxXmZ61UNDT4oHTYcMhXCfkTpc9AfNeMS7uL5hPszVCnFCeNfgTDCE67wCxzfAh1HAV/Nh5PtiwUBG8GHsLdTcYe6ZTYha09ytaY+bF4ZbUc+aB/saUnFNSMlrFvx0Ly8vDx0cHLzVbrc/S5Lkju3tbN8Bhho45GcR+jpTc9R0eWvpcGO5ES+Ke8By7MFsp0bN3H3bvdZ9GLc+GGc/9aiP6M7n2UrFxYJGFaI4hg3Nz883Dw8PP+rl0q2jB73QsA0t6uos9cDcqMeLoEYVoGhq1tqG+jFL8+iFRrZrmYZBLMbOqfMvMY3I493d3TdGR0e/ULLlyd2/2ys3b8dn7q3HF1C7eD755/0ryfb00wMzdqQOStHe3t7bY2Nj31iKh40bJT58jMC4EtwcVkFMzsRToyAuLS015+bmvrL0cZyx2kfJf9c/bT+48UPj5c3t6MlWO2piI7/9S3zhwUZ79bXLcaMRxyOdjihqNpsv7u/vf7KystI2jHNQZs7IljQSZGSRZ8RCbjfz5sjIyOckWkw+vNVaXbnbeEGwrnRm+ui36wuDl61AvcgMX7N36mtoZBt9bg6MK+FTSSAUaTweHh6+qiR8DHqZBR8ccLU308q1tRbIYxh2F2+AUev2vjZeUuDmj0n+0VDcl7vcTMs7J+vvquEJLVto0B3FcXxWG+5tDDx1/JxopTvvcI9x0XKN+R64tNF3w8eK3Zkr3M2oh8BYLc2QYZ9Iitn/pf+qp4vn2mt6LstdrmltZvzgPFcvZNjl5YKtVutXLS5cibb1XJa7XEcrn1GmUdUwNeKdnZ3veUC89MzgqzPT7VXFfDk44Got06pklH11DUeLi4vf2Vv5kAIW4w/eHThbZho1cMBlHzSgxXPVCIFcJGtSjDleWJ5vbm5enZiY0C8PtCa//3X4862fojN/bAyeB/Dcudb6wuvR9vPPDr1ix8Kcra2ta5OTk98afmSbXxaaG5zjyPNFI4ww5/7Ywa+rYduP2sbX66h9431st9TXQi80Mi1oQhszfL/g6IsxvzkCMEzT/HUGsUdsQ/wx26NTU1Pj/ZhGD3qhkWlBE9quYfqgL8ZahnETMJzessXxtbW1d+yvioe9rhoccNFjm7cLLWiemmF8NPSW+bFIb9lqY7bHZ2dnn1hfX3/P/qL40oz9aeZ3sZEDQw0ccLMevd2yjwNumTebRh4MLyzgWKz7YpdYpyXtydI08GuWDxajPmDENKIZ58Kq8nuY5guN2UFrFNehiqGFtZBZ3wzF6v+At241qWLIaVBxYjSr0e0hV/sLeeiGQaIxxhBGQQ5TQ4qBpzWeGX1c1AqrimE0qGmcKY4ci2ca6qDHBn0cXw8x9ndFGkbBNeViWtecojrMZ1x55CqPGHiaa1/6jUbAZwI1xTVnn4prXlYnz43oIcb+QlQDmhdIdtAac0ZwNXd79axmmDOCp7n25TX9SAAsG6w1zV3hsrNrSM+auxp5zTfYh1HAV/Nh5PtiPlyKPozlQs29YZCqGAhxQnhhKJ1YDOFCKaahASG82N051eGio47JLm6vYb3qvhdwGliXUYpWMVSFQ73TiEGzEK9jpg63H+OlRil4UhP99lcyR5Ma/wcTNr6KafiWBQAAAABJRU5ErkJggg=='
    },
    repertory: {
      color: ['#FEF8EE', '#ffbc53'],
      areaColor: '#FFEDD0',
      markPointColor: $YELLOW,
      markPointLabelColor: '#666',
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABS1JREFUWAmtV01rJFUUreokbTSdQBI0GdCBGYO6GkUdcNxmG8aFRjAuXGcf8DeIEly7VBzBj4UfW7dBEMQJDIjOdMAEJhkYAvlCSHeX91TXqTn1+r3qqk4evNz7zj333NMvXelOHF1sxSO2JyP2RXUG1uGO4qfSi6hiogpnFIOhnlLjw8wMq4eGXhQPmg4ZCuE+I3W46A+a8YgPcH3DfJirFeKE8IHBmWAI13kFjm+AD6OAr+bDyPfFgoGM4MPYW6i5w9wzmxC1prlb0x43Lwy3op41D/Y1pOKakJLXLPjp3tzcnDg7O3uv2+1+mSTJPduH2b4HDDVwyM8i9HWm5qjp8tbS4cZyI14U95jl2OPZTo2aufu2h637MG59MM5+6lEf0Z3Ps5WKiwWNKkRxDJtYXV1tnp+ffzbMpVtHD3qhYRta1NVZ6oG5UZ8sghpVgKKpWWubGMUszaMXGtmuZRoGsRj7p/5PYhqRx8fHx++0Wq1vlWx50j38eyveuTPbOH5wFbXe9Iv/JtfWDsdmX3rbjtRBKTo5OXl/enr6R0vxsHGjxIePERhXgpvDKojJmXhqFMSNjY3mysrK95bO4YyV9LqPkrufPhhrf3Uz/u/Rs1Gv08RG3nj469Xe0c529NytRhw3pvodUdRsNl8/PT39Ymtrq2sY56DMnJEtaSTIyCLPiIXcbubdqampOyRaTHp/frLdePz7q4INpL35m3cbr318wwrUi8zwmv2mfoBGttHn5sC4Ej6VBEKRxuPJycnbSsLbYJhZ8MEBV3szrVxba4E8hmF38QYYtR43Go03FEjaX+dvDcV9ucvNtLxzsv6BGp7QsoUG3VEcx1e0Yfyk/YKey3KXK1quMd8Dl0r7brhspitcxq1Sg7FamiHDPpEUs7+lD9VJp3V9V89lucs1rf2MH5zn6oUMu7xcsNPp/FEo2t/Zwrns4HAdrXxGmURVw9SIj46OfuEBcXzu5VuduTe3FfPl4ICrtUyrklH21TUcra+v/2y/yjYFLMaNGxtXykyjBg647IMGtHiuGiGQi2RNijHHC8vz/f392wsLC/rhgdbk/PFfv0U738xOnLafB3A+dX0vuvbB4cT8K2/ZsTDn4OBgbXFx8SfDe7b5YaG5wTmOPF80wghz7pcdfLuatP20bXy8tuwT73O7pZEWeqGRaUET2pjh+wZHX4z5zRGAYZrmtzOIPWUb4s/Ybi0tLc2MYho96IVGpgVNaLuG6YO+GGsZxk3AcHrLFmd2d3c/tP8q2sOuGhxw0WObtwstaF6aYbw19Jb5tkhv2WrTtmeWl5fn9/b2PrL/KL4zY/+Y+WNs5MBQAwfcrEdvt+ztgFvmzaaRB8MLCzgW6744INZvSXuyNA38mOWDxagPGDGNaMa5sKp8H6b5QmN20BrFdahiaGEtZNY3Q7H6X+CtW02qGHIaVJwYzWp0e8jV/kIeumGQaIwxhFGQw9SQYuBpjWdGHxe1wqpiGA1qGmeKI8fimYb66BODPo6vhxj7ByINo+CacjGta05RHeYzrjxylUcMPM21L/1EI+AzgZrimrNPxTUvq5PnRvQQY38hqgHNCyQ7aI05I7iau716VjPMGcHTXPvymr4lAJYN1prmrnDZ2TWkZ81djbzmG+zDKOCr+TDyfTEfLkUfxnKh5t4wSFUMhDghvDCUTiyGcKEU09CAEF7s7p/qcNFRx+QAd9iwYXXfC7gMbMAoRasYqsKh3mXEoFmI1zFThzuK8VKjFLyoiVH7K5mjSY3/A7JpvXADZyU6AAAAAElFTkSuQmCC'
    }
  }


  private option = {
    backgroundColor: '#fff',
    tooltip: {
      show: false
    },
    visualMap: {
      show: false,
      min: 0,
      max: 10,
      type: 'continuous',
      inRange: {
        color: ['']
      }
    },
    series: [{
      type: 'map',
      map: 'china',
      zoom: 1,
      itemStyle: {
        normal: {
          areaColor: '#86A5FD',
          borderColor: '',
          borderWidth: 0
        },
        emphasis: {
          areaColor: '#86A5FD'
        }
      },
      data: [],
      silent: true,
      markPoint: {
        symbol: '',
        symbolSize: 20,
        data: [],
        label: {
          show: false
        }
      }
    }]
  };
  private chart = null;

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    // 注册地图
    await this.dataService.getChinaJson();
    echarts.registerMap('china', this.dataService.chinaJson);

    // 转换为markpoint 数据
    let geoCoord = this.dataService.chinaJson.features;
    let pointData = [];
    if (this.mapData[0] && this.mapData[0].name) {
      pointData = this.mapData.map((v, i) => {
        let coordData = geoCoord.find(x => x.properties.name === v.name);
        let coord = [coordData.properties.cp[0] + '', coordData.properties.cp[1] + ''];
        return {
          name: v.name,
          coord: coord,
          value: v.value,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: this.themes[this.name].markPointLabelColor
          }
        }
      }).slice(0, 3);
    }


    // 配置option
    this.option.series[0].itemStyle.normal.areaColor = this.themes[this.name].areaColor;
    this.option.series[0].itemStyle.emphasis.areaColor = this.themes[this.name].areaColor;
    this.option.visualMap.inRange.color = this.themes[this.name].color;
    this.option.visualMap.min = this.mapData[this.mapData.length - 1].value;
    this.option.visualMap.max = this.mapData[0].value;

    this.option.series[0].markPoint.symbol = this.themes[this.name].symbol;
    this.option.series[0].markPoint.data = pointData;
    this.option.series[0].data = this.mapData;
    this.chart = echarts.init(document.getElementById(this.name));
    this.chart.setOption(this.option);
  }

  onWindowResize() {
    this.chart.resize();
  }
}
