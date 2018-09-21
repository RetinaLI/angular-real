import { NgModule } from '@angular/core';
import { SharedModule } from '../../providors/share.module';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
