import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  title: string;
  isLoggedIn: boolean;
  loginStatus: Subscription;

  constructor(private authService: AuthService) { }

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

}
