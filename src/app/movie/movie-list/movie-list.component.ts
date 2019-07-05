import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

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
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.movieService.getSearchResult()
    .subscribe( (response: any) => {
      this.searchSize = response.totalResults;
      this.searchResult = response.Search.filter( movie => movie.Type === 'movie' || movie.Type === 'series');
      this.isLoading = false;
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
    }, (error) => {
      this.isLoading = false;
      this.searchResult = null;
      this.searchResult = null;
    });
  }

  loadDefaultImage(event) {
    event.target.src = this.movieService.getDefaultPoster();
  }

  onMoreInfo(event) {
    const imdbID = event.currentTarget.id;
    this.router.navigate(['result/', imdbID]);
  }

  onAddToWatchList(event) {
    if (!this.authService.isLoggedIn) {
      return this.router.navigate(['/login']);
    }
    const imdbID = event.currentTarget.id;
    this.movieService.addToWatchList(imdbID)
      .subscribe( (response: {message: string, status: string}) => {
      console.log(response);
      if ( response.status === 'success') {
        event.target.innerText = 'Added to Watchlist';
      }
    });
  }
}
