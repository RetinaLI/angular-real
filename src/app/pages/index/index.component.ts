import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

	ngOnInit() {
		var myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
			title: {
				text: 'ECharts 入门示例'
			},
			tooltip: {},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		});
	}
}
