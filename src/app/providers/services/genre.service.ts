import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from 'src/app/shared/models/movies-response.model';
import { Genre } from 'src/app/shared/models/movie-detail-response.model';

interface GenreResponse {
  genres: Genre[];
}

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiKey: string = environment.API_KEY;
  private apiUrl: string = environment.MOVIE_API;
  private cache = new Map<string, any>();
  
  private localStorageKeyMovies = 'movieGenres';
  private localStorageKeyTv = 'tvGenres';

  constructor(private http: HttpClient) { }

  private fetchGenres(type: 'movie' | 'tv'): Observable<GenreResponse> {
    const url = `${this.apiUrl}/genre/${type}/list?api_key=${this.apiKey}&language=es-ES`;
    return this.get(url).pipe(
      tap(data => localStorage.setItem(type === 'movie' ? this.localStorageKeyMovies : this.localStorageKeyTv, JSON.stringify(data.genres)))
    );
  }

  getMovieGenres(): Observable<GenreResponse> {
    const storedGenres = localStorage.getItem(this.localStorageKeyMovies);
    if (storedGenres) {
      return new Observable<GenreResponse>(observer => {
        observer.next({ genres: JSON.parse(storedGenres) });
        observer.complete();
      });
    } else {
      return this.fetchGenres('movie');
    }
  }

  getTvGenres(): Observable<GenreResponse> {
    const storedGenres = localStorage.getItem(this.localStorageKeyTv);
    if (storedGenres) {
      return new Observable<GenreResponse>(observer => {
        observer.next({ genres: JSON.parse(storedGenres) });
        observer.complete();
      });
    } else {
      return this.fetchGenres('tv');
    }
  }

  getCommonGenres(): Observable<Genre[]> {
    const cachedGenres = localStorage.getItem('genres');
    if (cachedGenres) {
      return of(JSON.parse(cachedGenres));
    }
    return forkJoin([
      this.getMovieGenres(),
      this.getTvGenres()
    ]).pipe(
      map(([movieGenres, tvGenres]) => {
        const movieGenreIds = new Set(movieGenres.genres.map(g => g.id));
        const genres =  tvGenres.genres.filter(g => movieGenreIds.has(g.id));
        localStorage.setItem('genres', JSON.stringify(genres));

        return genres;
      })
    );
  }

  getTrendingMoviesAndTvShows(): Observable<MoviesResponse> {
    const url = `${this.apiUrl}/trending/all/week?api_key=${this.apiKey}`;
    return this.get(url);

  }

  private get(url: string): Observable<any> {
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.http.get<any>(url).pipe(
      tap(response => {
        this.cache.set(url, response.results)
      }),
      catchError((error) => {
        console.error('API request error', error);
        return throwError(error);
      })
    );
  }
}
