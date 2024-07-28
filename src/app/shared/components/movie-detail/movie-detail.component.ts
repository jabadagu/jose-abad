import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieDetailResponse } from '../../models/movie-detail-response.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  @Input() movie: MovieDetailResponse = {} as MovieDetailResponse;
  @Output() goBack = new EventEmitter<void>();
}
