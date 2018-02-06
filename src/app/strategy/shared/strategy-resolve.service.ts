import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { StrategyDataService } from '../../strategy';
import { StrategyQuery } from '../../proxy';

@Injectable()
export class StrategyResolveService implements Resolve<StrategyQuery> {
    constructor(private _strategyDataService: StrategyDataService, private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<StrategyQuery> | Promise<StrategyQuery> | any {
        const id = route.params['id'];
        return this._strategyDataService.get(id);
    }
}
