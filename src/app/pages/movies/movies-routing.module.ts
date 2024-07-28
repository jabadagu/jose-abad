import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDeatilComponent } from './movies-deatil/movies-deatil.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  { path: 'detail/:id', component: MoviesDeatilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}