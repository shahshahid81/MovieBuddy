import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  searchStatus: boolean;
  searchStatusSubscription: Subscription;
  searchResult;
  searchSize;
  defaultPoster = '/assets/img/defaultPoster.jpg';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    const result = this.movieService.getSearchResult();
    this.searchResult = result.searchResult;
    this.searchSize = result.searchSize;
  }

  onChangedPage(event) {
    this.movieService.searchMovie('', '', event.pageIndex + 1);
    const result = this.movieService.getSearchResult();
    this.searchResult = result.searchResult;
    this.searchSize = result.searchSize;
  }

  loadDefaultImage(event) {
    event.target.src = this.defaultPoster;
  }
}
