import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MovieService {

  movieName: string;
  movieYear: string;
  movieSearched = false;
  searchResult;
  searchSize;
  apiLink;
  defaultPoster = '/assets/img/defaultPoster.jpg';

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  searchMovies(movieName: string, movieYear: string, page: number = 1) {
    if (movieName !== '') {
      this.movieName = movieName;
    }
    this.apiLink = 'http://www.omdbapi.com/?s=' + this.movieName + '&apikey=' + environment.apikey + '&page=' + page;
    if ( movieYear !== '') {
      this.movieYear = movieYear;
      this.apiLink += '&y=' + this.movieYear;
    }
    this.movieSearched = true;
  }

  getSearchResult() {
    return this.http.get( encodeURI(this.apiLink) , {withCredentials: false});
  }

  searchMovie(imdbID: string) {
    const apiLink = 'http://www.omdbapi.com/?i=' + imdbID + '&apikey=' + environment.apikey;
    return this.http.get( encodeURI(apiLink), {withCredentials: false});
  }

  getDefaultPoster() {
    return this.defaultPoster;
  }

  addToWatchList(imdbID) {
    const url = 'http://localhost:3000/user/' + this.authService.getUserID() + '/watchlist/' + imdbID;
    return this.http.post(url, '', { withCredentials: true });
  }

  removeFromWatchList(imdbID) {
    const url = 'http://localhost:3000/user/' + this.authService.getUserID() + '/watchlist/' + imdbID;
    return this.http.delete(url, { withCredentials: true });
  }

  getWatchList(userID) {
    const url = 'http://localhost:3000/user/' + userID + '/watchlist';
    return this.http.get(url, { withCredentials: true });
  }

  getWatchListStatus(imdbID) {
    const url = 'http://localhost:3000/user/' + this.authService.getUserID() + '/watchlist/' + imdbID;
    return this.http.get(url, { withCredentials: true });
  }
}
