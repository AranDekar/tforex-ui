import { Component } from '@angular/core';
import { Http } from '@angular/http';

import * as shared from '../shared';

import * as core from '../core';

import * as strategy from '../strategy';

@Component({
  template: `

    <router-outlet></router-outlet>
  `,
})

export class StrategyComponent {

  constructor(
    private _http: Http
  ) {
    (<core.HttpService>_http).owner = 'strategies';
  }
}

