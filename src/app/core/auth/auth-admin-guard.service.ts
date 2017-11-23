import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
} from '@angular/router';
import { AuthService } from '../../core';

@Injectable()
export class AuthAdminGuardService implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isLoggedIn &&
      this._authService.isAdmin) { return true; }

    // Store the attempted URL for redirecting
    this._authService.redirectUrl = state.url;

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor',
    };

    // Navigate to the login page with extras
    this._router.navigate(['/login'], navigationExtras);
    return false;
  }
}
