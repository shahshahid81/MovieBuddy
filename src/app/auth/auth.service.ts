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

  logIn(userData) {
    console.log(userData);
    this.http.post('http://localhost:3000/login', userData)
    .subscribe( (response: {message: string} ) => {
      console.log(response);
      if (response.message === 'success') {
        // this.isLoggedIn = true;
        this.loginStatus.next(true);
        this.router.navigate(['/']);
      } else if (response.message === 'failed') {
        // this.isLoggedIn = false;
        this.loginStatus.next(false);
      }
    }, (err) => {
      console.log(err);
    });
  }

  register(userData) {
    this.http.post('http://localhost:3000/register', userData)
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
    this.http.get('http://localhost:3000/logout')
      .subscribe( (response) => {
        console.log(response);
        this.loginStatus.next(false);
        // if (response.message === 'sucess') {
        // }
      });
  }
}
