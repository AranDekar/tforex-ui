// Exact copy except import UserService from shared
import { Component } from '@angular/core';

import { HeroService } from '../hero';
import { AuthService } from '../core';

@Component({
  template: `
    <h2>Heroes of {{ _userId$|async }}</h2>
    <router-outlet></router-outlet>
  `,
})
export class HeroComponent {
  private _userId$;
  constructor(_authService: AuthService) {
    this._userId$ = _authService.userId$;
  }
}

