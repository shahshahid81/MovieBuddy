import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  searchStatus: boolean;
  searchStatusSubscription: Subscription;
  searchResult;
  searchSize;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.searchStatus = false;
    this.searchStatusSubscription = this.movieService.getSearchStatusListener()
      .subscribe( (status) => {
        this.searchStatus = status;
        if (this.searchStatus) {
          const result = this.movieService.getSearchResult();
          this.searchResult = result.searchResult;
          this.searchSize = result.searchSize;
        }
      });
  }

  ngOnDestroy() {
    this.searchStatusSubscription.unsubscribe();
  }

  onChangedPage(event) {
    this.movieService.searchMovie('', '', event.pageIndex + 1);
    const result = this.movieService.getSearchResult();
    this.searchResult = result.searchResult;
    this.searchSize = result.searchSize;
  }
}
