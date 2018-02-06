import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
} from '@angular/router';
import { AuthService } from '../../core';
import { Observable } from 'rxjs/RX';

@Injectable()
export class AuthAdminGuardService implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this._authService.isAdmin$.subscribe(
        data => {
          if (data) {
            return resolve(true);
          } else {

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
            resolve(false);
          }
        },
        error => { reject(error); });
    });
  }
}
