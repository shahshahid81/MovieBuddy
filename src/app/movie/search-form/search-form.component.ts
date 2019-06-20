import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  onMovieSearch(formRef: NgForm) {

    const movieName = formRef.value['movie-name'];
    const movieYear = formRef.value['movie-year'];
    if (movieName === '') {
      return;
    }
    this.movieService.searchMovie(movieName, movieYear);
    formRef.resetForm();
  }

}
