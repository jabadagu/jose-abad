import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/providers/services/movies.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Subscription } from 'rxjs';
import { MovieDetailResponse } from 'src/app/shared/models/movie-detail-response.model';

@Component({
  selector: 'app-movies-deatil',
  templateUrl: './movies-deatil.component.html',
  styleUrls: ['./movies-deatil.component.scss']
})
export class MoviesDeatilComponent implements OnInit, OnDestroy {
  movie: MovieDetailResponse = {} as MovieDetailResponse;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.getMovieDetail(+id);
        }
      })
    );
  }

  getMovieDetail(id: number): void {
    this.subscription.add(
      this.movieService.getMovieDetail(id).subscribe(
        data => this.movie = data,
        error => console.error('Error al obtener detalles de la película:', error)
      )
    );
  }

  searchMovie(searchTerm: string): void {
    this.searchService.setSearchTerm(searchTerm);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
