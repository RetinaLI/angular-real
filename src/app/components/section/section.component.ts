import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() theme: 'h1' | 'h2' | 'h3' = 'h1'; //
  @Input() title: string = '';
  @Input('order-number') orderNumber: string = ''; // 01 02等等
  @Input() origin: string = '';
  constructor() { }

  ngOnInit() {
  }

}
