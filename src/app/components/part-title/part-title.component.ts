import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-part-title',
  templateUrl: './part-title.component.html',
  styleUrls: ['./part-title.component.scss'],
  inputs: ['partNum', 'partName']
})
export class PartTitleComponent implements OnInit {

  public partNum: string;
  public partName: string;

  constructor() { }

  ngOnInit() {
  }

}
