import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesListComponent } from './series-list.component';
import { TvService } from 'src/app/providers/services/tv.service';
import { GenreService } from 'src/app/providers/services/genre.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SeriesResponse, TVShow } from 'src/app/shared/models/series-response.model';
import { Movie } from 'src/app/shared/models/movies-response.model';

describe('SeriesListComponent', () => {
  let component: SeriesListComponent;
  let fixture: ComponentFixture<SeriesListComponent>;
  let tvServiceMock: jasmine.SpyObj<TvService>;
  let genreServiceMock: jasmine.SpyObj<GenreService>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const tvServiceSpy = jasmine.createSpyObj('TvService', ['getLatestTvShows', 'getTvByGenre']);
    const genreServiceSpy = jasmine.createSpyObj('GenreService', ['getCommonGenres']);
    const searchServiceSpy = jasmine.createSpyObj('SearchService', ['searchTerm$', 'searchMoviesAndTvShows', 'setSearchTerm']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SeriesListComponent],
      providers: [
        { provide: TvService, useValue: tvServiceSpy },
        { provide: GenreService, useValue: genreServiceSpy },
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesListComponent);
    component = fixture.componentInstance;
    tvServiceMock = TestBed.inject(TvService) as jasmine.SpyObj<TvService>;
    genreServiceMock = TestBed.inject(GenreService) as jasmine.SpyObj<GenreService>;
    searchServiceMock = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data when there is no search term', async () => {
    const mockTvShows: SeriesResponse  = {
      "page": 1,
      "results": [
          {
              "adult": false,
              "backdrop_path": "/dfWbyhujRsX6B0AcQE0f3QtUhxk.jpg",
              "genre_ids": [
                  99,
                  10768
              ],
              "id": 82670,
              "origin_country": [
                  "US"
              ],
              "original_language": "en",
              "original_name": "World War Two",
              "overview": "",
              "popularity": 3447.018,
              "poster_path": "/wAs1ai9mVvebPK2Fz46oKjipeTt.jpg",
              "first_air_date": "2018-09-01",
              "name": "World War Two",
              "vote_average": 8.0,
              "vote_count": 3
          },
        ],
        total_pages: 42,
        total_results: 827
      }
    const mockGenres = [{ id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' }];

    tvServiceMock.getLatestTvShows.and.returnValue(of(mockTvShows));
    genreServiceMock.getCommonGenres.and.returnValue(of(mockGenres));

    await component.loadInitialData();

    expect(tvServiceMock.getLatestTvShows).toHaveBeenCalled();
    expect(genreServiceMock.getCommonGenres).toHaveBeenCalled();
    expect(component.tvCardsData).toEqual(mockTvShows.results);
    expect(component.movieGenres).toEqual(mockGenres.slice(0, 10));
  });



  it('should search for series when a search term is provided', () => {
    const searchTerm = 'test';
    const mockSearchResults = { results: [{ id: 1, name: 'Search Result' }] };

    searchServiceMock.searchMoviesAndTvShows.and.returnValue(of(mockSearchResults));

    component.searchSeries(searchTerm);

    expect(searchServiceMock.searchMoviesAndTvShows).toHaveBeenCalledWith(searchTerm.trim(), component.searchType);
    expect(component.tvCardsData).toEqual(mockSearchResults.results);
  });

  it('should handle errors when searching for series', () => {
    const searchTerm = 'test';
    searchServiceMock.searchMoviesAndTvShows.and.returnValue(throwError(() => new Error('Failed to search')));

    spyOn(console, 'error');

    component.searchSeries(searchTerm);

    expect(console.error).toHaveBeenCalledWith('Error al realizar la búsqueda:', new Error('Failed to search'));
  });

  it('should select genre and update tvCardsData', () => {
    const genreId = 1;
    const mockTvByGenre: SeriesResponse  = { } as SeriesResponse;

    tvServiceMock.getTvByGenre.and.returnValue(of(mockTvByGenre));

    component.onGenreSelected(genreId);

    expect(tvServiceMock.getTvByGenre).toHaveBeenCalledWith(genreId);
    expect(component.tvCardsData).toEqual(mockTvByGenre.results);
  });

  it('should navigate to series detail when viewSeriesDetail is called', () => {
    const series = {id: 1 } as Movie;

    component.viewSeriesDetail(series);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/series/detail', series.id]);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
