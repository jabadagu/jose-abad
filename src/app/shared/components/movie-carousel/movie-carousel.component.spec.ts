import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCarouselComponent } from './movie-carousel.component';
import { Movie } from '../../models/movies-response.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MovieCarouselComponent', () => {
  let component: MovieCarouselComponent;
  let fixture: ComponentFixture<MovieCarouselComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCarouselComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display movie carousel with input data', () => {
    const movies: Movie[] = [] as Movie[];
    component.data = movies;
    fixture.detectChanges();

    const movieElements = debugElement.queryAll(By.css('.movie-carousel-item'));
    expect(movieElements.length).toBe(movies.length);

    movieElements.forEach((element, index) => {
      const imgElement = element.query(By.css('img'));
      expect(imgElement.nativeElement.getAttribute('src')).toContain(movies[index].poster_path);
    });
  });
});

