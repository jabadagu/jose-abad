import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movies.service';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from 'src/app/shared/models/movies-response.model';
import { MovieDetailResponse } from 'src/app/shared/models/movie-detail-response.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.MOVIE_API;
  const apiKey = environment.API_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service['cache'].clear();
  });

  describe('getLatestMovies', () => {
    it('should fetch the latest movies', () => {
      const mockResponse: MoviesResponse = { } as MoviesResponse;
      const url = `${apiUrl}/movie/now_playing?api_key=${apiKey}&language=es-ES`;

      service.getLatestMovies().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should cache the result', () => {
      const mockResponse: MoviesResponse = { } as MoviesResponse;
      const url = `${apiUrl}/movie/now_playing?api_key=${apiKey}&language=es-ES`;

      service.getLatestMovies().subscribe();
      const req = httpMock.expectOne(url);
      req.flush(mockResponse);

      service.getLatestMovies().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      httpMock.verify();
    });
  });

  describe('getPopularMovies', () => {
    it('should fetch popular movies', () => {
      const mockResponse: MoviesResponse = { } as MoviesResponse;
      const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=es-ES`;

      service.getPopularMovies().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should cache the result', () => {
      const mockResponse: MoviesResponse = { } as MoviesResponse;
      const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=es-ES`;

      service.getPopularMovies().subscribe();
      const req = httpMock.expectOne(url);
      req.flush(mockResponse);

      service.getPopularMovies().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      httpMock.verify();
    });
  });

  describe('getMoviesByGenre', () => {
    it('should fetch movies by genre', () => {
      const mockResponse: MoviesResponse = { } as MoviesResponse;
      const genreId = 1;
      const url = `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

      service.getMoviesByGenre(genreId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should cache the result', () => {
      const mockResponse: MoviesResponse = { } as MoviesResponse;
      const genreId = 1;
      const url = `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

      service.getMoviesByGenre(genreId).subscribe();
      const req = httpMock.expectOne(url);
      req.flush(mockResponse);

      service.getMoviesByGenre(genreId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      httpMock.verify();
    });
  });

  describe('getMovieDetail', () => {
    it('should fetch movie details', () => {
      const mockResponse: MovieDetailResponse = { id: 1, title: 'Sample Movie' } as MovieDetailResponse;
      const movieId = 1;
      const url = `${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=es-ES`;

      service.getMovieDetail(movieId).subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should cache the result', () => {
      const mockResponse: MovieDetailResponse = { id: 1, title: 'Sample Movie' } as MovieDetailResponse;
      const movieId = 1;
      const url = `${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=es-ES`;

      service.getMovieDetail(movieId).subscribe();
      const req = httpMock.expectOne(url);
      req.flush(mockResponse);

      service.getMovieDetail(movieId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      httpMock.verify();
    });
  });
});
