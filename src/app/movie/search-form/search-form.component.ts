import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor(private movieService: MovieService,
              private router: Router) { }

  ngOnInit() {
  }

  onMovieSearch(formRef: NgForm) {

    const movieName = formRef.value['movie-name'];
    const movieYear = formRef.value['movie-year'];
    if (movieName === '') {
      return;
    }
    this.movieService.searchMovies(movieName, movieYear);
    this.router.navigate(['/result']);
    formRef.resetForm();
  }

}
