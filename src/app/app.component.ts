import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Title } from '@angular/platform-browser';
import RemFontSizeManager from './lib/rem-font-size';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'report';


  constructor (private dataService: DataService, private pageTitle: Title) {
    new RemFontSizeManager([375]);
  }

  async ngOnInit () {
    await this.dataService.getReportData();
    if(!this.dataService.reportData) return;
    this.title = this.dataService.reportData.title;
    this.pageTitle.setTitle(this.title);
  }
}
