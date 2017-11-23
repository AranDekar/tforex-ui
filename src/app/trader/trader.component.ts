import { Component } from '@angular/core';
import { Http } from '@angular/http';

import * as shared from '../shared';

import * as core from '../core';

import * as trader from '../trader';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
})

export class TraderComponent {

  constructor(
    private _http: Http
  ) {
  }
}

