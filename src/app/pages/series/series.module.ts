import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaredComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SeriesRoutingModule } from './series-routing-module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';


@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailComponent
  ],
  exports: [
    SeriesListComponent,
    SeriesDetailComponent
  ],
  imports: [
    CommonModule,
    SaredComponentsModule,
    SeriesRoutingModule
  ]
})
export class SeriesModule { }