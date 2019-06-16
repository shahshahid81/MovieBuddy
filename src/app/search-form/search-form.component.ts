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

  onClickSubmit(formRef: NgForm) {
    // console.log('Form Submitted');
    // console.log(formRef.value);
    const movieName = formRef.value['movie-name'];
    const movieYear = formRef.value['movie-year'];
    if (movieName === '') {
      return;
    }
    this.movieService.searchMovie(movieName, movieYear);
    // let apiLink = 'http://www.omdbapi.com/?t=' + movieName + '&apikey=' + environment.apikey;
    // if ( movieYear !== '') {
    //   apiLink += '&y=' + movieYear;
    // }
    // this.http.get( apiLink )
    //   .subscribe( (response) => {
    //     console.log(response);
    //   } );
  }

}
