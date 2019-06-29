import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  title: string;
  isLoggedIn: boolean;
  loginStatus: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.title = 'MovieBuddy';
    this.loginStatus = this.authService.getLoginStatus()
      .subscribe( status => {
        this.isLoggedIn = status;
      });
  }

  ngOnDestroy() {
    this.loginStatus.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onWatchlist() {
    const userid = this.authService.getUserID();
    this.router.navigate(['/user/', userid, 'watchlist']);
  }

}
