import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MovieService {

  movieName: string;
  movieYear: string;
  searchResult;
  searchSize;
  movieSearched = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  searchMovie(movieName: string, movieYear: string, page: number = 1) {
    if(movieName !== '') {
      this.movieName = movieName;
    }
    let apiLink = 'http://www.omdbapi.com/?s=' + this.movieName + '&apikey=' + environment.apikey + '&page=' + page;
    if ( movieYear !== '') {
      this.movieYear = movieYear;
      apiLink += '&y=' + this.movieYear;
    }
    this.http.get( apiLink )
      .subscribe( (response: any) => {
        console.log(response);
        this.searchSize = response.totalResults;
        this.searchResult = response.Search.filter( movie => movie.Type === 'movie' || movie.Type === 'series');
        // console.log(this.searchResult);
        this.movieSearched.next(true);
      } );
  }

  getSearchResult() {
    return {searchResult: [...this.searchResult], searchSize: this.searchSize};
  }

  getSearchStatusListener() {
    return this.movieSearched.asObservable();
  }
}
