import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenreService } from './genre.service';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from 'src/app/shared/models/movies-response.model';

describe('GenreService', () => {
  let service: GenreService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.MOVIE_API;
  const apiKey = environment.API_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreService]
    });

    service = TestBed.inject(GenreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear(); // Clear local storage after each test
  });

  describe('getMovieGenres', () => {
    it('should return genres from localStorage if available', () => {
      const mockGenres = { genres: [{ id: 1, name: 'Action' }] };
      localStorage.setItem('movieGenres', JSON.stringify(mockGenres.genres));

      service.getMovieGenres().subscribe(response => {
        expect(response.genres).toEqual(mockGenres.genres);
      });
    });

    it('should fetch genres from API if not available in localStorage', () => {
      const mockGenres = { genres: [{ id: 1, name: 'Action' }] };
      const url = `${apiUrl}/genre/movie/list?api_key=${apiKey}&language=es-ES`;

      service.getMovieGenres().subscribe(response => {
        expect(response.genres).toEqual(mockGenres.genres);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockGenres);
    });
  });

  describe('getTvGenres', () => {
    it('should return genres from localStorage if available', () => {
      const mockGenres = { genres: [{ id: 1, name: 'Drama' }] };
      localStorage.setItem('tvGenres', JSON.stringify(mockGenres.genres));

      service.getTvGenres().subscribe(response => {
        expect(response.genres).toEqual(mockGenres.genres);
      });
    });

    it('should fetch genres from API if not available in localStorage', () => {
      const mockGenres = { genres: [{ id: 1, name: 'Drama' }] };
      const url = `${apiUrl}/genre/tv/list?api_key=${apiKey}&language=es-ES`;

      service.getTvGenres().subscribe(response => {
        expect(response.genres).toEqual(mockGenres.genres);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockGenres);
    });
  });

  describe('getCommonGenres', () => {
    it('should return genres from localStorage if available', () => {
      const mockGenres = [{ id: 1, name: 'Action' }];
      localStorage.setItem('genres', JSON.stringify(mockGenres));

      service.getCommonGenres().subscribe(genres => {
        expect(genres).toEqual(mockGenres);
      });
    });

    it('should fetch and combine genres from movie and tv genres', () => {
      const movieGenres = { genres: [{ id: 1, name: 'Action' }] };
      const tvGenres = { genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }] };
      const urlMovie = `${apiUrl}/genre/movie/list?api_key=${apiKey}&language=es-ES`;
      const urlTv = `${apiUrl}/genre/tv/list?api_key=${apiKey}&language=es-ES`;

      service.getCommonGenres().subscribe(genres => {
        expect(genres).toEqual(movieGenres.genres);
      });

      const reqMovie = httpMock.expectOne(urlMovie);
      const reqTv = httpMock.expectOne(urlTv);

      expect(reqMovie.request.method).toBe('GET');
      expect(reqTv.request.method).toBe('GET');

      reqMovie.flush(movieGenres);
      reqTv.flush(tvGenres);
    });
  });

  describe('getTrendingMoviesAndTvShows', () => {
    it('should fetch trending movies and TV shows from API', () => {
      const mockResponse: any = { results: [] };
      const url = `${apiUrl}/trending/all/week?api_key=${apiKey}`;

      service.getTrendingMoviesAndTvShows().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});

