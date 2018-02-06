import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as rxjs from 'rxjs/RX';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { APP_CONFIG, AppConfig, User } from '../../core';

@Injectable()
export class AuthService {

  private _redirectUrl: string;
  private _userId$: rxjs.BehaviorSubject<string | number | null>;
  private _isAdmin$: rxjs.BehaviorSubject<boolean | null>;

  public get userId$(): rxjs.Observable<string | number | null> {
    return this._userId$.asObservable();
  }

  public get isAdmin$(): rxjs.Observable<boolean | null> {
    return this._isAdmin$.asObservable();
  }

  public get redirectUrl() {
    const url = sessionStorage.getItem('redirect_url');
    if (url) {
      this._redirectUrl = url;
    }
    return this._redirectUrl;
  }
  public set redirectUrl(value: string) {
    this._redirectUrl = value;
    sessionStorage.setItem('redirect_url', value);
  }

  constructor(protected http: Http,
    @Inject(APP_CONFIG) private _config: AppConfig,
    protected router: Router) {
    const userId = sessionStorage.getItem('user_id');
    this._userId$ = new rxjs.BehaviorSubject(userId);

    const isAdmin = sessionStorage.getItem('is_admin');
    this._isAdmin$ = new rxjs.BehaviorSubject(isAdmin === 'true');
  }

  public loginAndRedirect(userId: string | number, isAdmin: string) {
    if (userId) {

      sessionStorage.setItem('user_id', userId.toString());
      this._userId$.next(userId.toString());

      sessionStorage.setItem('is_admin', isAdmin);
      this._isAdmin$.next(isAdmin === 'true');

      let redirect = this.redirectUrl;
      if (!redirect) {
        redirect = '/strategies';
      }

      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve', // if you want to keep user_id in the params then you can set it to preserve
        preserveFragment: false,
      };
      this.router.navigate([redirect], navigationExtras);
    }
  }

  public logout() {
    sessionStorage.removeItem('user_id');
    this._userId$.next(null);

    sessionStorage.removeItem('is_admin');
    this._isAdmin$.next(null);
  }
}
