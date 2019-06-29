import { CanActivate, Router } from '@angular/router';
import { MovieService } from './movie.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ResultGuard implements CanActivate {

  constructor(private movieService: MovieService, private router: Router) {}

  canActivate(): boolean {
    // console.log('result guard');
    // console.log(this.movieService.searchResult);
    if ( !this.movieService.movieSearched ) {
      console.log('guard used');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
