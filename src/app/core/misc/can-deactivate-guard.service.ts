import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  public canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
