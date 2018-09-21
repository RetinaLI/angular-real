import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IImgTextSheetsData } from './img-text-sheets.interface';
import * as $ from 'jquery';

@Component({
  selector: 'app-img-text-sheets',
  templateUrl: './img-text-sheets.component.html',
  styleUrls: ['./img-text-sheets.component.scss']
})
export class ImgTextSheetsComponent implements OnInit {

  @Input() sheetsList: IImgTextSheetsData[];

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    let len = this.sheetsList.length;
    if( len > 2 ) {
      $(".img-text-sheets li:nth-child(3)").addClass("mt");
      $(".img-text-sheets li:nth-child(4)").addClass("mt");
    }
    
  }
}
