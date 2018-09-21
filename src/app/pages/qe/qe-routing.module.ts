import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QeComponent } from './qe.component';

const routes: Routes = [
  { path: '', component: QeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QeRoutingModule { }
