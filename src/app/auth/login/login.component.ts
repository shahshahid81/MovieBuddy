import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginFailed = false;
  }

  onLogin(form: NgForm) {
    this.authService.logIn(form.value);
  }

}
