import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {}

  isLoggedIn = false;
  isRegistered = false;
  loginStatus = new Subject<boolean>();
  userID = '';

  logIn(userData) {
    this.http.post('http://localhost:3000/login', userData, {withCredentials: true})
    .subscribe( (response: {message: string, userID: string} ) => {
      console.log(response);
      if (response.message === 'success') {
        this.isLoggedIn = true;
        this.loginStatus.next(true);
        this.userID = response.userID;
        this.router.navigate(['/']);
      } else if (response.message === 'failed') {
        this.isLoggedIn = false;
        this.loginStatus.next(false);
      }
    }, (err) => {
      console.log(err);
    });
  }

  register(userData) {
    this.http.post('http://localhost:3000/register', userData, {withCredentials: true})
      .subscribe( (response: {message: string} ) => {
        console.log(response);
        if (response.message === 'success') {
          this.isRegistered = true;
          this.router.navigate(['/login']);
        } else if (response.message === 'failed') {
          this.isRegistered = false;
        }
      });
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

  logout() {
    this.http.get('http://localhost:3000/logout', {withCredentials: true})
      .subscribe( (response: {message: string}) => {
        console.log(response);
        if (response.message === 'success') {
          this.loginStatus.next(false);
        }
      });
  }

  getUserID() {
    return this.userID;
  }
}
