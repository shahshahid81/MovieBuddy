import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularModule } from './angular-material.module';
import { HeaderComponent } from './header/header.component';
import { SearchFormComponent } from './movie/search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieService } from './movie/movie.service';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchFormComponent,
    MovieListComponent,
    LoginComponent,
    RegisterComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MovieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
