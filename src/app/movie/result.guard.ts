import { CanActivate, Router } from '@angular/router';
import { MovieService } from './movie.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ResultGuard implements CanActivate {

  constructor(private movieService: MovieService, private router: Router) {}

  canActivate(): boolean {
    if ( !this.movieService.movieSearched ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
