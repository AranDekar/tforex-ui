import { Routes,
  RouterModule }  from '@angular/router';

import { CrisisListComponent, CrisisDetailComponent }    from '../crisis';
import { AuthGuardService, CanDeactivateGuardService }             from '../core';

const routes: Routes = [
  { path: '',    component: CrisisListComponent },
  { path: ':id', component: CrisisDetailComponent, canDeactivate: [CanDeactivateGuardService] },
];

export const routing = RouterModule.forChild(routes);