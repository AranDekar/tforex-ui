import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';
import { AuthService } from '../../core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this._authService.redirectUrl = state.url;

    // Create a dummy session id
    const sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor',
    };

    // Navigate to the login page with extras
    this._router.navigate(['/login'], navigationExtras);
    return false;
  }
}
