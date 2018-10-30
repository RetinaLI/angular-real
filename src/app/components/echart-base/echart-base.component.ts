import { Component, OnInit, Input, ViewContainerRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-echart-base',
  templateUrl: './echart-base.component.html',
  styleUrls: ['./echart-base.component.scss']
})
export class EchartBaseComponent implements OnInit, AfterViewInit {
  @Input("chart-type") charType: string;

  @Input("option")
  set _option(_opt){
    this.option = _opt;
    if(this.option) {
      this.renderOption(_opt);
      this.renderChart();
    }
  }

  @Input("height") set _height(_h: string){
    this.height = _h;
    this.$element.style.height = (this.height);
    this.resizeChart();
  }

  height = "100%";
  private option: any;
  private chart: any;
  private $element: HTMLElement;
  id: string = 'echarts-' + FOTON_GLOBAL.uuid();

  constructor(private element: ViewContainerRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.$element = document.getElementById(this.id); // $(this.element.element.nativeElement).find(".echart-base").height(this.height);
    // this.$element.attr("id", "echart_base_" + Date.now());
    if (!this.chart)
      this.chart = echarts.init(this.$element, "macarons");

    this.renderChart();
  }

  renderChart(){
    if(!this.chart || !this.option) return;
    this.chart.setOption(this.option);
  }

  resizeChart(){
    if(!this.chart) return;
    this.chart.resize();
  }

  private renderOption(_opt){
    if(_opt.series[0].type == "bar") {
      if(_opt.yAxis[0].name && _opt.yAxis[0].name.length > 0) {
        _opt.yAxis[0].nameTextStyle = {
          padding: [0, (_opt.yAxis[0].name.length) * 12, 0, 0]
        };
      }
    }
  }
}
