import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchFormComponent } from './movie/search-form/search-form.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { ResultGuard } from './movie/result.gaurd'

const routes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'result', component: MovieListComponent, canActivate: [ResultGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResultGuard]
})
export class AppRoutingModule {}
