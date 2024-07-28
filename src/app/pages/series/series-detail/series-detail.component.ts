import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/providers/services/search.service';
import { TvService } from 'src/app/providers/services/tv.service';
import { SerieDetailResponse } from 'src/app/shared/models/serie-detail-response.model';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.scss']
})
export class SeriesDetailComponent implements OnInit {
  serie: SerieDetailResponse = {} as SerieDetailResponse;

  constructor(
    private route: ActivatedRoute, 
    private tvService: TvService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getSeriesDetail(+id);
      }
    });
  }

  private getSeriesDetail(id: number): void {
    this.tvService.getSeriesDetail(id).subscribe(
      data => this.serie = data,
      error => console.error('Error al obtener detalles de la serie:', error)
    );
  }

  searchMovie(searchTerm: string): void {
    this.searchService.setSearchTerm(searchTerm);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/series']);
  }
}
