import { NgModule } from '@angular/core';
import { SharedModule } from '../../providors/share.module';

import { LogisticReportRoutingModule } from './logistic-report-routing.module';
import { LogisticReportComponent } from './logistic-report.component';

@NgModule({
  imports: [
    SharedModule,
    LogisticReportRoutingModule
  ],
  declarations: [LogisticReportComponent]
})
export class LogisticReportModule { }
