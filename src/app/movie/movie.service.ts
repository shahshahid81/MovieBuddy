import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MovieService {

  movieName: string;
  movieYear: string;
  searchResult;
  searchSize;
  constructor(private http: HttpClient,
              private router: Router) { }

  searchMovie(movieName: string, movieYear: string, page: number = 1) {
    if (movieName !== '') {
      this.movieName = movieName;
    }
    let apiLink = 'http://www.omdbapi.com/?s=' + this.movieName + '&apikey=' + environment.apikey + '&page=' + page;
    if ( movieYear !== '') {
      this.movieYear = movieYear;
      apiLink += '&y=' + this.movieYear;
    }
    this.http.get( encodeURI(apiLink) )
      .subscribe( (response: any) => {
        console.log(response);
        this.searchSize = response.totalResults;
        this.searchResult = response.Search.filter( movie => movie.Type === 'movie' || movie.Type === 'series');
        this.router.navigate(['/result']);
      } );
  }

  getSearchResult() {
    return {searchResult: [...this.searchResult], searchSize: this.searchSize};
  }

}
