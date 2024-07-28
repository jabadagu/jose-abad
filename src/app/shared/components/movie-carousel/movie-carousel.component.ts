import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movies-response.model';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCarouselComponent {
  @Input() data: Movie[] = [];
  image_url: string = "https://image.tmdb.org/t/p/w500/";
  @Output() goBack = new EventEmitter<Movie>();
}
