import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesDeatilComponent } from './movies-deatil.component';
import { MovieService } from 'src/app/providers/services/movies.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieDetailResponse } from 'src/app/shared/models/movie-detail-response.model';

describe('MoviesDeatilComponent', () => {
  let component: MoviesDeatilComponent;
  let fixture: ComponentFixture<MoviesDeatilComponent>;
  let movieServiceMock: jasmine.SpyObj<MovieService>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovieDetail']);
    const searchServiceSpy = jasmine.createSpyObj('SearchService', ['setSearchTerm']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    activatedRouteSpy.paramMap = of(new Map([['id', '1']]));

    TestBed.configureTestingModule({
      declarations: [MoviesDeatilComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesDeatilComponent);
    component = fixture.componentInstance;
    movieServiceMock = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    searchServiceMock = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteMock = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie details on init', () => {
    const mockMovieDetail: MovieDetailResponse = { id: 1, title: 'Movie Title' } as MovieDetailResponse;
    movieServiceMock.getMovieDetail.and.returnValue(of(mockMovieDetail));

    component.ngOnInit();

    expect(movieServiceMock.getMovieDetail).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual(mockMovieDetail);
  });

  it('should handle errors when loading movie details', () => {
    const errorMsg = 'Failed to load movie details';
    movieServiceMock.getMovieDetail.and.returnValue(throwError(() => new Error(errorMsg)));

    spyOn(console, 'error');

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error al obtener detalles de la película:', new Error(errorMsg));
  });

  it('should set search term and navigate back', () => {
    const searchTerm = 'test';

    component.searchMovie(searchTerm);

    expect(searchServiceMock.setSearchTerm).toHaveBeenCalledWith(searchTerm);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/movies']);
  });

  it('should navigate back', () => {
    component.goBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/movies']);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
