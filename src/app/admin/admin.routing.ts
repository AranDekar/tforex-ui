import {
  Routes,
  RouterModule,
} from '@angular/router';

import * as admin from '../admin';

import { CanDeactivateGuardService, AuthAdminGuardService } from '../core';

const routes: Routes = [
  {
    path: '', component: admin.AdminComponent, canActivate: [AuthAdminGuardService], children: [
      {
        path: '', redirectTo: 'instruments',
      },
      {
        path: 'instruments', component: admin.InstrumentListComponent,
      },
    ],
  },
];

export const routing = RouterModule.forChild(routes);