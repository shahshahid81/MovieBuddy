import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  searchResult;
  searchSize;
  isLoading;

  constructor(private movieService: MovieService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.movieService.getSearchResult()
    .subscribe( (response: any) => {
      // console.log(response);
      this.searchSize = response.totalResults;
      this.searchResult = response.Search.filter( movie => movie.Type === 'movie' || movie.Type === 'series');
      this.isLoading = false;
      // console.log(this.searchSize);
      // console.log(this.searchResult);
    });
  }

  onChangedPage(event) {
    this.movieService.searchMovies('', '', event.pageIndex + 1);
    this.isLoading = true;
    this.movieService.getSearchResult()
    .subscribe( (response: any) => {
      if ( response.Response === 'False') {
        this.isLoading = false;
      }
      console.log(response);
      this.searchSize = response.totalResults;
      this.searchResult = response.Search.filter( movie => movie.Type === 'movie' || movie.Type === 'series');
      this.isLoading = false;
    });
  }

  loadDefaultImage(event) {
    event.target.src = this.movieService.getDefaultPoster();
  }

  onMoreInfo(event) {
    const imdbID = event.currentTarget.id;
    this.router.navigate(['/result/', imdbID]);
  }
}
