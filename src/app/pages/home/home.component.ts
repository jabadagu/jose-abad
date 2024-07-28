import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { GenreService } from 'src/app/providers/services/genre.service';
import { MovieService } from 'src/app/providers/services/movies.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Movie } from 'src/app/shared/models/movies-response.model';
import { TVShow } from 'src/app/shared/models/series-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchType: string = 'all';
  trendingMoviesAndTvShows: Movie[] = [];
  movieCardsData: Movie[] = [];
  movieGenres: Array<{ id: number, name: string }> = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private movieService: MovieService,
    private movieGenreService: GenreService,
    private searchService: SearchService,
    private router: Router
  ) { }

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
        this.movieGenreService.getTrendingMoviesAndTvShows(),
        this.movieService.getPopularMovies(),
        this.movieGenreService.getCommonGenres()
      ]).subscribe(([trendingData, popularData, genresData]) => {
        this.trendingMoviesAndTvShows = trendingData.results.slice(1, 6);
        this.movieCardsData = popularData.results;
        this.movieGenres = genresData;
      }, error => {
        console.error('Error al cargar datos:', error);
      })
    );
  }

  onGenreSelected(genreId: number) {
    this.fetchMoviesByGenre(genreId);
  }

  private fetchMoviesByGenre(genreId: number) {
    this.subscriptions.add(
      this.movieService.getMoviesByGenre(genreId).subscribe(
        data => this.movieCardsData = data.results,
        error => console.error('Error al cargar películas por género:', error)
      )
    );
  }

  setValuetoSearch(valueToSearch: string) {
    this.searchService.setSearchTerm(valueToSearch);
  }

  searchMovie(valueToSearch: string) {
    this.subscriptions.add(
      this.searchService.searchMoviesAndTvShows(valueToSearch.trim(), this.searchType)
        .subscribe(
          response => this.movieCardsData = response.results,
          error => console.error('Error al realizar la búsqueda:', error)
        )
    );
  }

  viewMovieDetail(movie: Movie) {
    console.log(movie);
    this.router.navigate([`/${movie.media_type && movie.media_type !== 'movie' ? 'series' : 'movies'}/detail`, movie.id]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
