import { Component, OnInit, Input } from '@angular/core';
import { ITopNavData } from './top-nav.interface';

let times = new Date().getTime();

let imgUrls = [
  require('../../../assets/images/sell-report-banner.png'),
  require('../../../assets/images/product/product-ban.png'),
  require('../../../assets/images/serve/banner-serve.png'),
  require('../../../assets/images/logistic/banner.png'),
  require('../../../assets/images/quality/qe-banner.png')
];

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Input() theme: string;

  @Input() bannerInfo: ITopNavData;

  themeMap: {} = {
    sell: {
      imgUrl: imgUrls[0]
    },
    product: {
      imgUrl: imgUrls[1]
    },
    serve: {
      imgUrl: imgUrls[2]
    },
    logistic: {
      imgUrl: imgUrls[3]
    },
    quality: {
      imgUrl: imgUrls[4]
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
