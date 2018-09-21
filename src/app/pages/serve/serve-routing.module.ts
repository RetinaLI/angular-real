import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServeComponent} from './serve.component';

const routes: Routes = [
  {
    path: '', component: ServeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServeRoutingModule { }
