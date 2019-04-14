import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies.component/movies.component';
import { ProjectionComponent } from './components/projection.component/projection.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: 'watch/:id',
    component: ProjectionComponent
  }
];

export const APP_ROUTES = appRoutes;