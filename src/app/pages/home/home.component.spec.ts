import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/providers/services/movies.service';
import { GenreService } from 'src/app/providers/services/genre.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Movie } from 'src/app/shared/models/movies-response.model';
import { SaredComponentsModule } from 'src/app/shared/components/shared-components.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const movieServiceMock = {
    getPopularMovies: jasmine.createSpy('getPopularMovies').and.returnValue(of({ results: [] })),
    getMoviesByGenre: jasmine.createSpy('getMoviesByGenre').and.returnValue(of({ results: [] }))
  };

  const genreServiceMock = {
    getTrendingMoviesAndTvShows: jasmine.createSpy('getTrendingMoviesAndTvShows').and.returnValue(of({ results: [] })),
    getCommonGenres: jasmine.createSpy('getCommonGenres').and.returnValue(of([]))
  };

  const searchServiceMock = {
    searchTerm$: of(''),
    searchMoviesAndTvShows: jasmine.createSpy('searchMoviesAndTvShows').and.returnValue(of({ results: [] })),
    setSearchTerm: jasmine.createSpy('setSearchTerm')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        { provide: GenreService, useValue: genreServiceMock },
        { provide: SearchService, useValue: searchServiceMock }
      ],
      imports:[SaredComponentsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load initial data if search term is empty', () => {
      component.ngOnInit();
      expect(genreServiceMock.getTrendingMoviesAndTvShows).toHaveBeenCalled();
      expect(movieServiceMock.getPopularMovies).toHaveBeenCalled();
      expect(genreServiceMock.getCommonGenres).toHaveBeenCalled();
    });

    it('should call searchMovie when search term is provided', () => {
      searchServiceMock.searchTerm$ = of('test');
      spyOn(component, 'searchMovie');
      component.ngOnInit();
      expect(component.searchMovie).toHaveBeenCalledWith('test');
    });
  });

  describe('loadInitialData', () => {
    it('should set data correctly', () => {
      const trendingMovies: Movie[] = [{ id: 1, title: 'Trending Movie' } as Movie];
      const popularMovies: Movie[] = [{ id: 2, title: 'Popular Movie' } as Movie];
      const genres: Array<{ id: number, name: string }> = [{ id: 1, name: 'Action' }];
      
      genreServiceMock.getTrendingMoviesAndTvShows.and.returnValue(of({ results: trendingMovies }));
      movieServiceMock.getPopularMovies.and.returnValue(of({ results: popularMovies }));
      genreServiceMock.getCommonGenres.and.returnValue(of(genres));

      component.loadInitialData();

      expect(component.trendingMoviesAndTvShows).toEqual(trendingMovies.slice(1, 6));
      expect(component.movieCardsData).toEqual(popularMovies);
      expect(component.movieGenres).toEqual(genres);
    });

    it('should handle error during data loading', () => {
      genreServiceMock.getTrendingMoviesAndTvShows.and.returnValue(throwError('Error'));
      movieServiceMock.getPopularMovies.and.returnValue(throwError('Error'));
      genreServiceMock.getCommonGenres.and.returnValue(throwError('Error'));

      spyOn(console, 'error');
      component.loadInitialData();

      expect(console.error).toHaveBeenCalledWith('Error al cargar datos:', 'Error');
    });
  });

  describe('searchMovie', () => {
    it('should call searchService and set movieCardsData', () => {
      const searchResults = { results: [{ id: 3, title: 'Searched Movie' } as Movie] };
      searchServiceMock.searchMoviesAndTvShows.and.returnValue(of(searchResults));

      component.searchMovie('test search');

      expect(searchServiceMock.searchMoviesAndTvShows).toHaveBeenCalledWith('test search', 'all');
      expect(component.movieCardsData).toEqual(searchResults.results);
    });

    it('should handle search errors', () => {
      searchServiceMock.searchMoviesAndTvShows.and.returnValue(throwError('Error'));

      spyOn(console, 'error');
      component.searchMovie('test search');

      expect(console.error).toHaveBeenCalledWith('Error al realizar la búsqueda:', 'Error');
    });
  });

  describe('onGenreSelected', () => {
    it('should fetch movies by genre', () => {
      component.onGenreSelected(1);
      expect(movieServiceMock.getMoviesByGenre).toHaveBeenCalledWith(1);
    });
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
