import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { APP_CONFIG, AppConfig, User } from '../../core';

@Injectable()
export class AuthService {
  public defaultHeaders: Headers = new Headers();
  protected basePath = 'http://localhost:10020/';
  private _redirectUrl: string;
  private _userId: string | number | null;
  private _isAdmin: boolean;

  public set userId(value: string | number | null) {
    this._userId = value;
    if (value) {
      sessionStorage.setItem('user_id', value.toString());
    } else {
      sessionStorage.removeItem('user_id');
    }
  }
  public get userId() {
    this._userId = sessionStorage.getItem('user_id');
    return this._userId;
  }

  public get isLoggedIn() { return this.userId; }

  public get isAdmin() {
    this._isAdmin = sessionStorage.getItem('is_admin') === 'true';
    return this._isAdmin;
  }

  public set isAdmin(value: boolean | null) {
    this._isAdmin = value;
    if (value) {
      sessionStorage.setItem('is_admin', value.toString());
    } else {
      sessionStorage.removeItem('is_admin');
    }
  }

  public get redirectUrl() {
    let url = sessionStorage.getItem('redirect_url');
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
    if (_config.apiGatewayBasePath) {
      this.basePath = _config.apiGatewayBasePath;
    }
  }

  public loginAndRedirect(userId: string | number, isAdmin: string) {
    if (userId) {
      this.userId = userId;
      this.isAdmin = isAdmin === 'true';
      let redirect = this.redirectUrl;
      if (!redirect) {
        redirect = '/strategies';
      }

      let navigationExtras: NavigationExtras = {
        preserveQueryParams: true, // if you want to keep user_id in the params then you can set it to true
        preserveFragment: false,
      };
      this.router.navigate([redirect], navigationExtras);
    }
  }

  public logout() {
    this.userId = null;
    this._isAdmin = false;
  }

  public getUser(extraHttpRequestParams?: any): Observable<User> {
    const path = this.basePath + '/user';
    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters,
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }
}