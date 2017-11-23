import {
  Routes,
  RouterModule,
} from '@angular/router';

import { TraderComponent, TraderListComponent } from '../trader';

import { CanDeactivateGuardService, AuthGuardService } from '../core';

const routes: Routes = [
  {
    path: '', component: TraderComponent, children: [
      {
        path: '', component: TraderListComponent, canActivate: [AuthGuardService],
      },
    ],
  },
];

export const routing = RouterModule.forChild(routes);