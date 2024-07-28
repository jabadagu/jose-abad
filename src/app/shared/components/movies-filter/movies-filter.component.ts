import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre } from '../../models/movie-detail-response.model';

@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesFilterComponent {
  @Input() genres: Genre[] = [];
  @Output() genreSelected = new EventEmitter<number>();
  selectedGenreId = 0;
  private subscriptions: Subscription = new Subscription();
  constructor(private router: Router) { }

  ngOnInit() {
    const movieGenresSubscription = this.router.events.subscribe(event => {
      this.updateActiveLink();
    });
    this.subscriptions.add(movieGenresSubscription);
  }

  updateActiveLink() {
    const currentPath = this.router.url;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

    navLinks.forEach(link => {
      const path = link.getAttribute('data-path');
      if (path === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  onTvGenreChange(genreId: number) {
    this.selectedGenreId = genreId;
    this.genreSelected.emit(genreId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
