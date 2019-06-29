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
    // let imdbID = this.router.url.slice(8);
    const imdbID = this.route.snapshot.paramMap.get('movieid');
    this.movieService.searchMovie(imdbID)
      .subscribe( (response: any) => {
      this.response = response;
      this.movieService.getWatchListStatus(imdbID)
        .subscribe( (status: any) => {
          if (status.message === 'success') {
            this.isInWatchlist = true;
          }
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
      .subscribe( (response: {message: string}) => {
      console.log(response);
      if ( response.message === 'success') {
        this.isInWatchlist = true;
      }
    });
  }

  onRemoveFromWatchList(event) {
    const imdbID = event.currentTarget.id;
    this.movieService.removeFromWatchList(imdbID)
      .subscribe( (response: any) => {
        console.log(response);
        if (response.message === 'success') {
        this.isInWatchlist = false;
        }
      });
  }

}
