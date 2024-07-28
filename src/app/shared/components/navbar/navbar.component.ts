import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  searchMovie(){
    this.search.emit(this.searchTerm);
  }
}
