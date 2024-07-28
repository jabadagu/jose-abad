import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TvService } from './tv.service';
import { environment } from 'src/environments/environment';
import { SerieDetailResponse } from 'src/app/shared/models/serie-detail-response.model';
import { SeriesResponse } from 'src/app/shared/models/series-response.model';

describe('TvService', () => {
  let service: TvService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.MOVIE_API;
  const apiKey = environment.API_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvService]
    });

    service = TestBed.inject(TvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getLatestTvShows', () => {
    it('should fetch the latest TV shows', () => {
      const mockResponse: any = { results: [] };
      const url = `${apiUrl}/tv/on_the_air?api_key=${apiKey}&language=es-ES&page=1`;

      service.getLatestTvShows().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getTvByGenre', () => {
    it('should fetch TV shows by genre', () => {
      const mockResponse: any = { results: [] };
      const genreId = 1;
      const url = `${apiUrl}/discover/tv?api_key=${apiKey}&with_genres=${genreId}&language=es-ES`;

      service.getTvByGenre(genreId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getSeriesDetail', () => {
    it('should fetch the details of a specific TV series', () => {
      const mockResponse: any = { id: 1, name: 'Test Series', overview: 'Test Overview' }; // Mock details based on SerieDetail model
      const seriesId = 1;
      const url = `${apiUrl}/tv/${seriesId}?api_key=${apiKey}&language=es-ES`;

      service.getSeriesDetail(seriesId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('Caching mechanism', () => {
    it('should cache responses to avoid redundant requests', () => {
      const mockResponse: any = { results: [] };
      const url = `${apiUrl}/tv/on_the_air?api_key=${apiKey}&language=es-ES&page=1`;

      service.getLatestTvShows().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(url);
      req.flush(mockResponse);

      service.getLatestTvShows().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      httpMock.expectNone(url);
    });
  });
});

