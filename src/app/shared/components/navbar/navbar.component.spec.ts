import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { FormsModule } from '@angular/forms';  // Importa FormsModule si estás usando ngModel o [(ngModel)]

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FormsModule], // Importa FormsModule si usas ngModel
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term on searchMovie', () => {
    spyOn(component.search, 'emit');

    component.searchTerm = 'test';
    component.searchMovie();

    expect(component.search.emit).toHaveBeenCalledWith('test');
  });

});

