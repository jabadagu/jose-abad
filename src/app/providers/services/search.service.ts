import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounce, debounceTime, Observable} from 'rxjs';
import { MoviesResponse } from 'src/app/shared/models/movies-response.model';
import { SeriesResponse } from 'src/app/shared/models/series-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = environment.MOVIE_API;
  private apiKey: string = environment.API_KEY;
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  searchMoviesAndTvShows(query: string, type: string): Observable<any> {
    let url = `${this.apiUrl}/search/`;

    switch(type) {
      case 'movie':
        url += 'movie';
        break;
      case 'tv':
        url += 'tv';
        break;
      default:
        url += 'multi';
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query);

    return this.http.get<MoviesResponse | SeriesResponse>(url, { params });
  }
}
