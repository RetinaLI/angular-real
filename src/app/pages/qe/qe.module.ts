import { NgModule } from '@angular/core';

import { QeRoutingModule } from './qe-routing.module';
import { QeComponent } from './qe.component';
import { SharedModule } from '../../providors/share.module';

@NgModule({
  imports: [
    SharedModule,
    QeRoutingModule
  ],
  declarations: [QeComponent]
})
export class QeModule { }
