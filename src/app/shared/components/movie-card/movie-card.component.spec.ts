import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../models/movies-response.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit viewDetail event when button is clicked', () => {
    const movie = { id: 573435 } as Movie;
    component.movie = movie;

    spyOn(component.viewDetail, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button).not.toBeNull();
    button.nativeElement.click();

    expect(component.viewDetail.emit).toHaveBeenCalledWith(movie);
  });
});

