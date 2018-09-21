import { NgModule } from '@angular/core';
import { SharedModule } from '../../providors/share.module';
import { SellReportRoutingModule} from './sell-report-routing.module';

import { SellReportComponent } from './sell-report.component';

@NgModule({
  imports: [
    SharedModule,
    SellReportRoutingModule
  ],
  declarations: [
    SellReportComponent
  ]
})
export class SellReportModule {
  constructor () {

  }
}
