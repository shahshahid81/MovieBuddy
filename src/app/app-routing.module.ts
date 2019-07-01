import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchFormComponent } from './movie/search-form/search-form.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { ResultGuard } from './movie/result.guard';
import { WatchListGuard } from './movie/watchlist.guard';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { WatchlistComponent } from './movie/watchlist/watchlist.component';

const routes: Routes = [
  { path: '', component: SearchFormComponent },
  {
    path: 'result',
    component: MovieListComponent,
    canActivate: [ResultGuard]
  },
  {
    path: 'result/:movieid',
    component: MovieDetailComponent,
    canActivate: [ResultGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user/:userid/watchlist',
    component: WatchlistComponent,
    canActivate: [WatchListGuard]
  },
  {
    path: 'user/:userid/watchlist/:movieid',
    component: MovieDetailComponent,
    canActivate: [WatchListGuard]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResultGuard, WatchListGuard]
})
export class AppRoutingModule {}
