import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenreService } from 'src/app/providers/services/genre.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { TvService } from 'src/app/providers/services/tv.service';
import { Movie } from 'src/app/shared/models/movies-response.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit, OnDestroy {
  searchType: string = 'tv';
  tvCardsData: any[] = [];
  movieGenres: Array<{ id: number, name: string }> = [];
  private destroy$ = new Subject<void>();

  constructor(
    private tvService: TvService, 
    private movieGenreService: GenreService,
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchService.searchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => {
        term ? this.searchSeries(term) : this.loadInitialData();
      });
  }

  async loadInitialData() {
    try {
      const [tvShows, genres] = await Promise.all([
        this.tvService.getLatestTvShows().toPromise(),
        this.movieGenreService.getCommonGenres().toPromise()
      ]);
      
      if (tvShows && tvShows.results) {
        this.tvCardsData = tvShows.results;
      } else {
        this.tvCardsData = [];
      }

      if (genres) {
        this.movieGenres = genres.slice(0, 10);
      } else {
        this.movieGenres = [];
      }
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
    }
  }

  onGenreSelected(genreId: number) {
    this.tvService.getTvByGenre(genreId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => this.tvCardsData = data.results,
        error => console.error('Error al obtener series por género:', error)
      );
  }

  searchSeries(valueToSearch: string) {
    this.searchService.searchMoviesAndTvShows(valueToSearch.trim(), this.searchType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => this.tvCardsData = response.results,
        error => console.error('Error al realizar la búsqueda:', error)
      );
  }

  viewSeriesDetail(movie: Movie) {
    this.router.navigate(['/series/detail', movie.id]);
  }

  setValuetoSearch(valueToSearch: string) {
    this.searchService.setSearchTerm(valueToSearch);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
