import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticReportComponent } from './logistic-report.component';

const routes: Routes = [
  {
    path: '', component: LogisticReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticReportRoutingModule { }
