import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TopNavComponent } from '../components/top-nav/top-nav.component';
import { PartTitleComponent } from '../components/part-title/part-title.component';
import { MapComponent } from '../components/map/map.component';
import { PieComponent } from '../components/pie/pie.component';
import { AccountIfAddComponent } from '../components/account-if-add/account-if-add.component';
import { LogoBottomComponent } from '../components/logo-bottom/logo-bottom.component';
import { ProgressComponent } from '../components/progress/progress.component';
import { PieListComponent } from '../components/pie-list/pie-list.component';
import { ImgTextSheetsComponent } from '../components/img-text-sheets/img-text-sheets.component';
import { SortListComponent } from '../components/sort-list/sort-list.component';

import { NumberFormaterPipe } from '../pipes/number-formater.pipe';
import { UnitPipe } from '../pipes/unit.pipe';
import { ToNumberPipe } from '../pipes/to-number.pipe';
import { SortComponent } from '../components/sort/sort.component';
import { SectionComponent } from '../components/section/section.component';
import { SubPipe } from '../pipes/sub.pipe';
import { BarComponent } from '../components/bar/bar.component';
import { Level2TitleComponent } from '../components/level2-title/level2-title.component';
import { EchartBaseComponent } from '../components/echart-base/echart-base.component';

const IMPORT_LIST = [CommonModule, FormsModule];

const EXPORT_LIST = [
  CommonModule, FormsModule,
  TopNavComponent,
  PartTitleComponent,
  ProgressComponent,
  SortListComponent,
  SortComponent,
  UnitPipe,
  ToNumberPipe,
  MapComponent,
  PieComponent,
  NumberFormaterPipe,
  SubPipe,
  LogoBottomComponent,
  ImgTextSheetsComponent,
  AccountIfAddComponent,
  PieListComponent,
  SectionComponent,
  BarComponent,
  Level2TitleComponent,
  EchartBaseComponent
];

const DECLARATION_LIST = [
  NumberFormaterPipe,
  UnitPipe,
  ToNumberPipe,
  SubPipe,
  TopNavComponent,
  PartTitleComponent,
  MapComponent,
  PieComponent,
  NumberFormaterPipe,
  AccountIfAddComponent,
  LogoBottomComponent,
  ImgTextSheetsComponent,
  PieListComponent,
  SortListComponent,
  SortComponent,
  ProgressComponent,
  SectionComponent,
  BarComponent,
  Level2TitleComponent,
  EchartBaseComponent
];

@NgModule({
  imports: IMPORT_LIST,
  exports: EXPORT_LIST,
  declarations: DECLARATION_LIST
})
export class SharedModule { }
