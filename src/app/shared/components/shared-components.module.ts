import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesFilterComponent } from './movies-filter/movies-filter.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SerieDetailComponent } from './serie-detail/serie-detail.component';

@NgModule({
  declarations: [
    MovieCardComponent,
    MovieCarouselComponent,
    NavbarComponent,
    MoviesFilterComponent,
    FooterComponent,
    MovieDetailComponent,
    SerieDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MovieCardComponent,
    MovieCarouselComponent,
    NavbarComponent,
    MoviesFilterComponent,
    FooterComponent,
    MovieDetailComponent,
    SerieDetailComponent
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaredComponentsModule { }
