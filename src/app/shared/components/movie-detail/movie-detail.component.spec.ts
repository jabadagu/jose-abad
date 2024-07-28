import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailResponse } from '../../models/movie-detail-response.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie details', () => {
    const movie: MovieDetailResponse = {
      "adult": false,
      "backdrop_path": "/tncbMvfV0V07UZozXdBEq4Wu9HH.jpg",
      "belongs_to_collection": {
          "id": 14890,
          "name": "Dos policías rebeldes - Colección",
          "poster_path": "/tMLtQTmkyyVGI0HCuQeQw9Ja6fJ.jpg",
          "backdrop_path": "/k9hhSHg5GS4UgWQC6MHBOZrarji.jpg"
      },
      "budget": 100000000,
      "genres": [
          {
              "id": 28,
              "name": "Acción"
          },
          {
              "id": 80,
              "name": "Crimen"
          },
          {
              "id": 53,
              "name": "Suspense"
          },
          {
              "id": 35,
              "name": "Comedia"
          }
      ],
      "homepage": "https://www.sonypictures.es/pelicula/bad-boys-ride-or-die",
      "id": 573435,
      "imdb_id": "tt4919268",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_title": "Bad Boys: Ride or Die",
      "overview": "Los policías más famosos del mundo regresan con su icónica mezcla de acción al límite y comedia escandalosa, pero esta vez con un giro inesperado: ¡Los mejores de Miami se dan a la fuga! Cuarta entrega de la saga 'Dos policías rebeldes'.",
      "popularity": 8779.976,
      "poster_path": "/5jI2vEHJReAx8iFDmhC2O3yW37w.jpg",
      "production_companies": [
          {
              "id": 122771,
              "logo_path": "/bYRqVEAuaC1QWmt3hGo0PMdK7EX.png",
              "name": "Westbrook",
              "origin_country": "US"
          },
          {
              "id": 5,
              "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
              "name": "Columbia Pictures",
              "origin_country": "US"
          },
          {
              "id": 10288,
              "logo_path": "/Aszf09kIVXR6cwG9lwjZIawbYVS.png",
              "name": "Don Simpson/Jerry Bruckheimer Films",
              "origin_country": "US"
          },
          {
              "id": 84792,
              "logo_path": "/7Rfr3Zu6QnHpXW2VdSEzUminAQd.png",
              "name": "2.0 Entertainment",
              "origin_country": "US"
          }
      ],
      "production_countries": [
          {
              "iso_3166_1": "US",
              "name": "United States of America"
          }
      ],
      "release_date": "2024-06-05",
      "revenue": 388242778,
      "runtime": 115,
      "spoken_languages": [
          {
              "english_name": "English",
              "iso_639_1": "en",
              "name": "English"
          }
      ],
      "status": "Released",
      "tagline": "Los mejores de Miami son ahora los más buscados.",
      "title": "Bad Boys: Ride or Die",
      "video": false,
      "vote_average": 7.621,
      "vote_count": 1029
  };

    component.movie = movie;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1'));
    const overviewElement = fixture.debugElement.query(By.css('p'));

    expect(titleElement).toBeTruthy();
    expect(overviewElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Bad Boys: Ride or Die');
    expect(overviewElement.nativeElement.textContent).toContain('Bad Boys: Ride or Die');
  });

  it('should emit goBack event when back button is clicked', () => {
    spyOn(component.goBack, 'emit');

    const buttonElement = debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.goBack.emit).toHaveBeenCalled();
  });
});
