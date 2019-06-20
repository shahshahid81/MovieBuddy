import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFailed: boolean;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.registerFailed = false;
  }

  onRegister(form: NgForm) {
    // console.log(form.value);
    this.http.post('http://localhost:3000/register', form.value)
      .subscribe( (response: {message: string} ) => {
        if (response.message === 'success') {
          this.router.navigate(['/login']);
        } else if (response.message === 'failed') {
          this.registerFailed = true;
        }
      });
  }

}
