import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'index.html', loadChildren: './pages/index/index.module#IndexModule' },
  { path: 'sell.html', loadChildren: './pages/sell-report/sell-report.module#SellReportModule'},
  { path: 'logistic.html', loadChildren: './pages/logistic-report/logistic-report.module#LogisticReportModule'},
  { path: 'serve.html', loadChildren: './pages/serve/serve.module#ServeModule'},
  { path: 'product.html', loadChildren: './pages/product/product.module#ProductModule'},
  { path: 'qe.html', loadChildren: './pages/qe/qe.module#QeModule'},
  { path: '', redirectTo: "index.html", pathMatch: "full" },
  { path: '**', redirectTo: 'sell.html'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
