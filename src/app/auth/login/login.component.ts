import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed: boolean;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.http.post('http://localhost:3000/login', form.value)
      .subscribe( (response: {message: string} ) => {
        console.log(response);
        if (response.message === 'success') {
          this.router.navigate(['/']);
        } else if (response.message === 'failed') {
          this.loginFailed = true;
        }
      }, (err) => {
        console.log(err);
      });
  }

}
