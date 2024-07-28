import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SeriesDetailComponent } from './series-detail.component';
import { TvService } from 'src/app/providers/services/tv.service';
import { SearchService } from 'src/app/providers/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaredComponentsModule } from 'src/app/shared/components/shared-components.module';

describe('SeriesDetailComponent', () => {
  let component: SeriesDetailComponent;
  let fixture: ComponentFixture<SeriesDetailComponent>;

  const tvServiceMock = {
    getSeriesDetail: jasmine.createSpy('getSeriesDetail').and.returnValue(of({}))
  };

  const searchServiceMock = {
    setSearchTerm: jasmine.createSpy('setSearchTerm')
  };

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  const activatedRouteMock = {
    paramMap: of(new Map([['id', '1']]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesDetailComponent],
      providers: [
        { provide: TvService, useValue: tvServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      imports: [HttpClientTestingModule, SaredComponentsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get series detail on initialization', () => {
      component.ngOnInit();
      expect(tvServiceMock.getSeriesDetail).toHaveBeenCalledWith(1);
    });

    it('should handle error while getting series details', () => {
      tvServiceMock.getSeriesDetail.and.returnValue(throwError('Error'));
      spyOn(console, 'error');
      component.ngOnInit();
      expect(console.error).toHaveBeenCalledWith('Error al obtener detalles de la serie:', 'Error');
    });
  });

  describe('searchMovie', () => {
    it('should set search term and navigate back', () => {
      component.searchMovie('test search');
      expect(searchServiceMock.setSearchTerm).toHaveBeenCalledWith('test search');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/series']);
    });
  });

  describe('goBack', () => {
    it('should navigate back to the series list', () => {
      component.goBack();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/series']);
    });
  });
});

