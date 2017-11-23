import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrategyModule } from './strategy';
import { LoginModule } from './login';

const routes: Routes = [
  { path: '', redirectTo: '/strategies', pathMatch: 'full' },
  { path: 'traders', loadChildren: 'app/trader/trader.module#TraderModule' },
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'crises', loadChildren: 'app/crisis/crisis.module' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
];


@NgModule({
  imports: [
    LoginModule,
    StrategyModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
