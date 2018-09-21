import { NgModule } from '@angular/core';
import { SharedModule } from '../../providors/share.module';

import { ServeRoutingModule } from './serve-routing.module';
import { ServeComponent } from './serve.component';

@NgModule({
  imports: [
    SharedModule,
    ServeRoutingModule
  ],
  declarations: [ServeComponent]
})
export class ServeModule { 
  constructor () {

  }
}
