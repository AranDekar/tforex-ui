import { Component } from '@angular/core';
import { Http } from '@angular/http';

import * as shared from '../shared';

import * as core from '../core';

import * as trader from '../trader';

@Component({
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a routerLink="/admin/instruments" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: false }"  
          class="nav-link active">Instruments</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
})

export class AdminComponent { }

