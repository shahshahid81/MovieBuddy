import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieService {

  response;
  movieSearched = false;
  constructor(private http: HttpClient) { }

  searchMovie(movieName: string, movieYear: string) {
    if (movieName === '') {
      return;
    }
    let apiLink = 'http://www.omdbapi.com/?t=' + movieName + '&apikey=' + environment.apikey;
    if ( movieYear !== '') {
      apiLink += '&y=' + movieYear;
    }
    this.http.get( apiLink )
      .subscribe( (response) => {
        console.log(response);
        this.response = response;
        this.movieSearched = true;
      } );
  }

  // getMovie() {
  //   return {...this.response};
  // }
}
