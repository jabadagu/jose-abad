import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from 'src/app/shared/models/movies-response.model';
import { MovieDetailResponse } from 'src/app/shared/models/movie-detail-response.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey: string = environment.API_KEY;
  private apiUrl: string = environment.MOVIE_API;
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }

  getLatestMovies(): Observable<MoviesResponse> {
    const url = `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=es-ES`;
    return this.get(url);
  }

  getPopularMovies(): Observable<MoviesResponse> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES`;
    return this.get(url);
  }

  getMoviesByGenre(genreId: number): Observable<MoviesResponse> {
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`;
    return this.get(url);
  }

  getMovieDetail(id: number): Observable<MovieDetailResponse> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`;
    return this.get(url);
  }

  get(url: string): Observable<any> {
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


