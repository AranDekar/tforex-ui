import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import * as core from '../core';

@Component({
  template: `
    <h2>LOGIN</h2>
    <p> {{ _message }} </p>
    <p>
      <button (click)="login('/auth/google')"  *ngIf="!_authService._isLoggedIn">Login (google)</button>
      <button (click)="logout()" *ngIf="_authService._isLoggedIn">Logout</button>
    </p>`,
})
export class LoginComponent implements OnInit, OnDestroy {
  private _message: string;
  private _sub: Subscription;

  constructor(public _authService: core.AuthService, public router: Router,
    private _route: ActivatedRoute, @Inject(core.APP_CONFIG) private _config: core.AppConfig) {
    this.setMessage();
  }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        const userId = params['user_id'];
        const isAdmin = params['is_admin'];

        if (userId) {
          this._authService.loginAndRedirect(userId, isAdmin);
        }
      });
  }

  public ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private setMessage() {
    this._message = 'Logged ' + (this._authService.isLoggedIn ? 'in' : 'out');
  }

  private login(path: string) {
    this._message = 'Trying to log in ...';
    window.location.href = this._config.apiGatewayBasePath + path;

    /*
        this._authService.login().subscribe(() => {
          this.setMessage();
          if (this._authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/strategies';

            // Set our navigation extras object
            // that passes on our global query params and fragment
            let navigationExtras: NavigationExtras = {
              preserveQueryParams: true,
              preserveFragment: true,
            };

            // Redirect the user
            this.router.navigate([redirect], navigationExtras);
          }
        });
    */
  }

  private logout() {
    this._authService.logout();
    this.setMessage();
  }
}
