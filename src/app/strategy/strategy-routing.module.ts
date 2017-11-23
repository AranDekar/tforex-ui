import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrategyComponent, StrategyListComponent, StrategyViewComponent, StrategyResolveService } from '../strategy';

import { CanDeactivateGuardService, AuthGuardService } from '../core';

const routes: Routes = [
  {
    path: 'strategies', component: StrategyComponent, children: [
      {
        path: '', component: StrategyListComponent, canActivate: [AuthGuardService],
      },
      {
        path: ':id', component: StrategyViewComponent, canDeactivate: [CanDeactivateGuardService],
        resolve: { strategy: StrategyResolveService }, canActivate: [AuthGuardService],
      },
      // { path: ':id', component: HeroDetailComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule { }

