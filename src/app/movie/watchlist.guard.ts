import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WatchListGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if ( this.authService.getUserID() !== '') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
