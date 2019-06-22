import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  response: any;
  isLoading;

  constructor(private movieService: MovieService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    let imdbID = this.router.url.slice(8);
    this.movieService.searchMovie(imdbID)
      .subscribe( (response: any) => {
      this.response = response;
      this.isLoading = false;
    });
  }

  loadDefaultImage(event) {
    event.target.src = this.movieService.getDefaultPoster();
  }

  backToResults() {
    this.router.navigate(['/result']);
  }

}
