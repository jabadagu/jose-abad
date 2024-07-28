import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesFilterComponent } from './movies-filter.component';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Genre } from '../../models/movie-detail-response.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';

describe('MoviesFilterComponent', () => {
  let component: MoviesFilterComponent;
  let fixture: ComponentFixture<MoviesFilterComponent>;
  let debugElement: DebugElement;
  let router: Router;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject<any>();

    await TestBed.configureTestingModule({
      declarations: [ MoviesFilterComponent ],
      providers: [
        { 
          provide: Router, 
          useValue: { 
            events: routerEvents$ 
          } 
        } 
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesFilterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit genreSelected event on genre change', () => {
    spyOn(component.genreSelected, 'emit');

    const genreId = 1;
    component.onTvGenreChange(genreId);

    expect(component.genreSelected.emit).toHaveBeenCalledWith(genreId);
  });

  afterEach(() => {
    routerEvents$.complete();
    component.ngOnDestroy();
  });
});


