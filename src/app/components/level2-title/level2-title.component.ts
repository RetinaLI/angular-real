import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level2-title',
  templateUrl: './level2-title.component.html',
  styleUrls: ['./level2-title.component.scss']
})
export class Level2TitleComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
