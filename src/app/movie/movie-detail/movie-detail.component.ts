import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  response: any;
  isLoading: boolean;
  isInWatchlist: boolean;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.isInWatchlist = false;
    const imdbID = this.route.snapshot.paramMap.get('movieid');
    this.movieService.searchMovie(imdbID)
      .subscribe( (response: any) => {
      this.response = response;
      this.movieService.getWatchListStatus(imdbID)
        .subscribe( (watchlistStatus: any) => {
          if (watchlistStatus.status === 'success') {
            this.isInWatchlist = true;
          }
          this.isLoading = false;
        }, (error) => {
          this.isInWatchlist = false;
          this.isLoading = false;
        });
    });
  }

  loadDefaultImage(event) {
    event.target.src = this.movieService.getDefaultPoster();
  }

  backToResults() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddToWatchList(event) {
    const imdbID = event.currentTarget.id;
    this.movieService.addToWatchList(imdbID)
      .subscribe( (response: {message: string, status: string}) => {
      console.log(response);
      if ( response.status === 'success') {
        this.isInWatchlist = true;
      }
    });
  }

  onRemoveFromWatchList(event) {
    const imdbID = event.currentTarget.id;
    this.movieService.removeFromWatchList(imdbID)
      .subscribe( (response: {message: string, status: string}) => {
        console.log(response);
        if (response.status === 'success') {
        this.isInWatchlist = false;
        }
      });
  }

}
