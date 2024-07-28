import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SerieDetailResponse } from 'src/app/shared/models/serie-detail-response.model';
import { SeriesResponse } from 'src/app/shared/models/series-response.model';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  private apiKey: string = environment.API_KEY;
  private apiUrl: string = environment.MOVIE_API;
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }
  
  getLatestTvShows(): Observable<SeriesResponse> {
    const url = `${this.apiUrl}/tv/on_the_air?api_key=${this.apiKey}&language=es-ES&page=1`;
    return this.get(url);
  }

  getTvByGenre(genreId: number): Observable<SeriesResponse> {
    const url = `${this.apiUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${genreId}&language=es-ES`;
    return this.get(url);
  }

  getSeriesDetail(id: number): Observable<SerieDetailResponse> {
    const url = `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}&language=es-ES`;
    return this.get(url);
  }

  private get(url: string): Observable<any> {
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.http.get<any>(url).pipe(
      tap(response => this.cache.set(url, response)),
      catchError((error) => {
        console.error('API request error', error);
        return throwError(error);
      })
    );
  }
}
