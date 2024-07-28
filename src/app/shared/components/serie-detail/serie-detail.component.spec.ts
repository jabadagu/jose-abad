import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SerieDetailComponent } from './serie-detail.component';
import { SerieDetailResponse } from '../../models/serie-detail-response.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SerieDetailComponent', () => {
  let component: SerieDetailComponent;
  let fixture: ComponentFixture<SerieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerieDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit goBack event when goBack is called', () => {
    spyOn(component.goBack, 'emit');

    component.goBack.emit();
    expect(component.goBack.emit).toHaveBeenCalled();
  });

  it('should bind input property serie correctly', () => {

    const mockSerie: SerieDetailResponse = {
      "adult": false,
      "backdrop_path": "/m2D5bhoAB0ewe42m8rfIl0a1ahM.jpg",
      "created_by": [
          {
              "id": 4295178,
              "credit_id": "65155aec1db65d0100ac7f93",
              "name": "Wei Fenghua",
              "original_name": "Wei Fenghua",
              "gender": 2,
              "profile_path": "/x0WmMQcCj3m1AbgCncZ8qtwZyJT.jpg"
          }
      ],
      "episode_run_time": [
          45
      ],
      "first_air_date": "2022-09-27",
      "genres": [
          {
              "id": 9648,
              "name": "Misterio"
          },
          {
              "id": 80,
              "name": "Crimen"
          },
          {
              "id": 10759,
              "name": "Action & Adventure"
          }
      ],
      "homepage": "",
      "id": 211089,
      "in_production": true,
      "languages": [
          "zh"
      ],
      "last_air_date": "2024-07-27",
      "last_episode_to_air": {
          "id": 4856686,
          "name": "Episodio 24",
          "overview": "",
          "vote_average": 0,
          "vote_count": 0,
          "air_date": "2024-07-27",
          "episode_number": 24,
          "episode_type": "standard",
          "production_code": "",
          "runtime": 46,
          "season_number": 2,
          "show_id": 211089,
          "still_path": "/obFrXpEafu0aCE4YaR13DJ8Q26a.jpg"
      },
      "name": "唐朝诡事录",
      "next_episode_to_air": {
          "id": 4856687,
          "name": "Episodio 25",
          "overview": "",
          "vote_average": 0,
          "vote_count": 0,
          "air_date": "2024-07-28",
          "episode_number": 25,
          "episode_type": "standard",
          "production_code": "",
          "runtime": 46,
          "season_number": 2,
          "show_id": 211089,
          "still_path": "/xfuQqslw8XS6Aig7YGN5jylGOnZ.jpg"
      },
      "networks": [
          {
              "id": 1330,
              "logo_path": "/fNxBFqWr7eWEgNeBDvvCxsSItXx.png",
              "name": "iQiyi",
              "origin_country": "CN"
          }
      ],
      "number_of_episodes": 76,
      "number_of_seasons": 2,
      "origin_country": [
          "CN"
      ],
      "original_language": "zh",
      "original_name": "唐朝诡事录",
      "overview": "",
      "popularity": 3327.427,
      "poster_path": "/sgv6nwj1TlDDKqxbcUEuds8fqoz.jpg",
      "production_companies": [
          {
              "id": 172414,
              "logo_path": "/2bKju6wsVUHhzKzNiHcxq80OkM6.png",
              "name": "iQIYI",
              "origin_country": "CN"
          }
      ],
      "production_countries": [
          {
              "iso_3166_1": "CN",
              "name": "China"
          }
      ],
      "seasons": [
          {
              "air_date": "2022-09-27",
              "episode_count": 36,
              "id": 310309,
              "name": "Temporada 1",
              "overview": "",
              "poster_path": "/sgv6nwj1TlDDKqxbcUEuds8fqoz.jpg",
              "season_number": 1,
              "vote_average": 0
          },
          {
              "air_date": "2024-07-18",
              "episode_count": 40,
              "id": 362783,
              "name": "Temporada 2",
              "overview": "",
              "poster_path": "/6BNcnIvEmtdeOaXLsBl5TtJkOXs.jpg",
              "season_number": 2,
              "vote_average": 0
          }
      ],
      "spoken_languages": [
          {
              "english_name": "Mandarin",
              "iso_639_1": "zh",
              "name": "普通话"
          }
      ],
      "status": "Returning Series",
      "tagline": "",
      "type": "Scripted",
      "vote_average": 8,
      "vote_count": 17
  };
    component.serie = mockSerie;
    fixture.detectChanges();

    expect(component.serie).toEqual(mockSerie);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(mockSerie.name);
  });
});

