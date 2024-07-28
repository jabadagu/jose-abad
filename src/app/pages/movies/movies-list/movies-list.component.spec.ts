import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieService } from 'src/app/providers/services/movies.service';
import { GenreService } from 'src/app/providers/services/genre.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Movie, MoviesResponse } from 'src/app/shared/models/movies-response.model';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let movieServiceMock: jasmine.SpyObj<MovieService>;
  let genreServiceMock: jasmine.SpyObj<GenreService>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getLatestMovies', 'getMoviesByGenre']);
    const genreServiceSpy = jasmine.createSpyObj('GenreService', ['getCommonGenres']);
    const searchServiceSpy = jasmine.createSpyObj('SearchService', ['searchTerm$', 'searchMoviesAndTvShows', 'setSearchTerm']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: GenreService, useValue: genreServiceSpy },
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    movieServiceMock = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    genreServiceMock = TestBed.inject(GenreService) as jasmine.SpyObj<GenreService>;
    searchServiceMock = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data when no search term is provided', () => {
    const mockMovies = { results: [{ id: 1, title: 'Movie 1' }] } as MoviesResponse;
    const mockGenres = [{ id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' }];

    movieServiceMock.getLatestMovies.and.returnValue(of(mockMovies));
    genreServiceMock.getCommonGenres.and.returnValue(of(mockGenres));

    component.loadInitialData();

    expect(movieServiceMock.getLatestMovies).toHaveBeenCalled();
    expect(genreServiceMock.getCommonGenres).toHaveBeenCalled();
    expect(component.movieCardsData).toEqual(mockMovies.results);
    expect(component.movieGenres).toEqual(mockGenres.slice(0, 10));
  });



  it('should search for movies when a search term is provided', () => {
    const searchTerm = 'test';
    const mockSearchResults = { } as MoviesResponse;

    searchServiceMock.searchMoviesAndTvShows.and.returnValue(of(mockSearchResults));

    component.searchMovie(searchTerm);

    expect(searchServiceMock.searchMoviesAndTvShows).toHaveBeenCalledWith(searchTerm.trim(), component.searchType);
    expect(component.movieCardsData).toEqual(mockSearchResults.results);
  });

  it('should handle errors when searching for movies', () => {
    const searchTerm = 'test';
    searchServiceMock.searchMoviesAndTvShows.and.returnValue(throwError(() => new Error('Failed to search')));

    spyOn(console, 'error');

    component.searchMovie(searchTerm);

    expect(console.error).toHaveBeenCalledWith('Error al realizar la búsqueda:', new Error('Failed to search'));
  });

  it('should navigate to movie detail when viewMovieDetail is called', () => {
    const movie = {id: 1} as Movie;

    component.viewMovieDetail(movie);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/movies/detail', movie.id]);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
