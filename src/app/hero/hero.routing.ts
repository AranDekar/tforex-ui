import { Routes,
  RouterModule }  from '@angular/router';

import { HeroComponent, HeroListComponent, HeroDetailComponent }    from '../hero';

const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
    children: [
      { path: '', component: HeroListComponent },
      { path: ':id', component: HeroDetailComponent },
      { path: 'admin', component: HeroDetailComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
