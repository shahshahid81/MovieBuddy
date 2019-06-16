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
  response;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.searchStatus = false;
    this.searchStatusSubscription = this.movieService.getSearchStatusListener()
      .subscribe( (status) => {
        this.searchStatus = status;
        if (this.searchStatus) {
          this.response = this.movieService.getMovie();
        }
      });
  }

  ngOnDestroy() {
    this.searchStatusSubscription.unsubscribe();
  }
}
