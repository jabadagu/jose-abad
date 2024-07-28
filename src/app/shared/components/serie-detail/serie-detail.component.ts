import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SerieDetailResponse } from '../../models/serie-detail-response.model';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.scss']
})
export class SerieDetailComponent {
  @Input() serie: SerieDetailResponse = {} as SerieDetailResponse;
  @Output() goBack = new EventEmitter<void>();

}
