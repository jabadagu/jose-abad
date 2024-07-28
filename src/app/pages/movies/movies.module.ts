import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaredComponentsModule } from 'src/app/shared/components/shared-components.module';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDeatilComponent } from './movies-deatil/movies-deatil.component';

@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesDeatilComponent
  ],
  exports: [
    MoviesListComponent,
    MoviesDeatilComponent
  ],
  imports: [
    CommonModule,
    SaredComponentsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }