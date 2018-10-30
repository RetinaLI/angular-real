import { Component, OnInit, Input } from '@angular/core';
import { IImgTextSheetsData } from './img-text-sheets.interface';

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
}
