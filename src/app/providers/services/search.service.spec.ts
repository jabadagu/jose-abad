import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from 'src/app/shared/models/movies-response.model';
import { SeriesResponse } from 'src/app/shared/models/series-response.model';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.MOVIE_API;
  const apiKey = environment.API_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('searchMoviesAndTvShows', () => {
    it('should fetch movies when type is movie', () => {
      const mockResponse: any = { results: [] };
      const query = 'Inception';
      const url = `${apiUrl}/search/movie`;
      
      service.searchMoviesAndTvShows(query, 'movie').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => 
        req.url === url && req.params.has('api_key') && req.params.has('query')
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('query')).toBe(query);
      req.flush(mockResponse);
    });

    it('should fetch series when type is tv', () => {
      const mockResponse: any = { results: [] };
      const query = 'Breaking Bad';
      const url = `${apiUrl}/search/tv`;

      service.searchMoviesAndTvShows(query, 'tv').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => 
        req.url === url && req.params.has('api_key') && req.params.has('query')
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('query')).toBe(query);
      req.flush(mockResponse);
    });

    it('should fetch both movies and series when type is multi', () => {
      const mockResponse: any = { results: [] }; // Adjust according to actual response type
      const query = 'Matrix';
      const url = `${apiUrl}/search/multi`;

      service.searchMoviesAndTvShows(query, 'multi').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req => 
        req.url === url && req.params.has('api_key') && req.params.has('query')
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('query')).toBe(query);
      req.flush(mockResponse);
    });
  });

  describe('BehaviorSubject', () => {
    it('should update search term and emit new value', () => {
      const searchTerm = 'Inception';
      let emittedValue: string | undefined;

      service.searchTerm$.subscribe(term => {
        emittedValue = term;
      });

      service.setSearchTerm(searchTerm);
      expect(emittedValue).toBe(searchTerm);
    });
  });
});

