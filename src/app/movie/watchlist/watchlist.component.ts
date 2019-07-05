import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { AuthService } from 'src/app/auth/auth.service';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  isLoading;
  watchlist;

  constructor(private movieService: MovieService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    const userid = this.authService.getUserID();
    this.movieService.getWatchList(userid)
      .subscribe( (response: any) => {
        console.log(response);
        this.watchlist = JSON.parse(response.watchlist);
        if (this.watchlist.length === 0) {
          this.isLoading = false;
          return;
        }
        this.watchlist = this.watchlist.map( (title) => {
          return this.movieService.searchMovie(title);
        });
        console.log(this.watchlist);
        forkJoin(...this.watchlist)
          .subscribe( val => {
            this.isLoading = false;
            this.watchlist = val;
          }, (error) => {
            this.isLoading = false;
            this.watchlist = null;
          });
      }, (error) => {
        this.isLoading = false;
        this.watchlist = null;
      });
  }

  loadDefaultImage(event) {
    event.target.src = this.movieService.getDefaultPoster();
  }

  onMoreInfo(event) {
    const imdbID = event.currentTarget.id;
    this.router.navigate(['/user', this.authService.getUserID(), 'watchlist', imdbID]);
  }

  onRemoveFromWatchList(event) {
    const imdbID = event.currentTarget.id;
    this.movieService.removeFromWatchList(imdbID)
      .subscribe( (response: {message: string, status: string}) => {
        console.log(response);
        if (response.status === 'success') {
          event.target.innerText = 'Removed from Watchlist';
        }
      });
  }

}
