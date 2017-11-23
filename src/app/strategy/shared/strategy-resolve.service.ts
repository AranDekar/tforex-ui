import { Injectable }             from '@angular/core';
import { Router, Resolve,
    ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

import { StrategyQuery, StrategyDataService } from '../../strategy';

@Injectable()
export class StrategyResolveService implements Resolve<StrategyQuery> {
    constructor(private _strategyDataService: StrategyDataService, private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<StrategyQuery> | Promise<StrategyQuery> | any {
        let id = route.params['id'];
        return this._strategyDataService.get(id);
    }
}
