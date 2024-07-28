import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { GenreService } from 'src/app/providers/services/genre.service';
import { MovieService } from 'src/app/providers/services/movies.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Movie } from 'src/app/shared/models/movies-response.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  searchType: string = 'movie';
  movieCardsData: Movie[] = [];
  movieGenres: Array<{ id: number, name: string }> = [];
  private subscriptions = new Subscription();

  constructor(
    private movieService: MovieService,
    private movieGenreService: GenreService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.searchService.searchTerm$.subscribe(term => {
        term ? this.searchMovie(term) : this.loadInitialData();
      })
    );
  }

  loadInitialData() {
    this.subscriptions.add(
      forkJoin([
        this.movieService.getLatestMovies(),
        this.movieGenreService.getCommonGenres()
      ]).subscribe(
        ([moviesData, genresData]) => {
          this.movieCardsData = moviesData.results;
          this.movieGenres = genresData.slice(0, 10);
        },
        error => console.error('Error al cargar datos iniciales:', error)
      )
    );
  }

  getMovie(): void {
    this.subscriptions.add(
      this.movieService.getLatestMovies().subscribe(
        data => this.movieCardsData = data.results,
        error => console.error('Error al obtener películas:', error)
      )
    );
  }

  onGenreSelected(genreId: number) {
    this.subscriptions.add(
      this.movieService.getMoviesByGenre(genreId).subscribe(
        data => this.movieCardsData = data.results,
        error => console.error('Error al obtener películas por género:', error)
      )
    );
  }

  setValuetoSearch(valueToSearch: string) {
    this.searchService.setSearchTerm(valueToSearch);
  }

  searchMovie(valueToSearch: string) {
    this.subscriptions.add(
      this.searchService.searchMoviesAndTvShows(valueToSearch.trim(), this.searchType).subscribe(
        response => this.movieCardsData = response.results,
        error => console.error('Error al realizar la búsqueda:', error)
      )
    );
  }

  viewMovieDetail(movie: Movie) {
    this.router.navigate(['/movies/detail', movie.id]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

