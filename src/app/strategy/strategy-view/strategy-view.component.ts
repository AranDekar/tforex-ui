import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DialogService } from '../../core';

import * as core from '../../core';
import * as strategy from '../../strategy';
import { StrategyQuery } from '../../proxy/index';

@Component({
    moduleId: module.id,
    templateUrl: 'strategy-view.component.html',
})
export class StrategyViewComponent implements OnInit {
    private _strategy: StrategyQuery;
    private _editName: string | undefined;
    private _userId: string | number | null;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        public _dialogService: DialogService,
        private _authService: core.AuthService
    ) {
    }

    public ngOnInit() {
        this._route.data.forEach((data: { strategy: StrategyQuery }) => {
            this._editName = data.strategy.name;
            this._strategy = data.strategy;
        });
    }

    public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no strategy or the strategy is unchanged
        if (!this._strategy || this._strategy.name === this._editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this._dialogService.confirm('Discard changes?');
    }

    private cancel() {
        this.gotoStrategies();
    }

    private save() {
        this._strategy.name = this._editName;
        this.gotoStrategies();
    }


    private gotoStrategies() {
        const strategyId = this._strategy ? this._strategy._id : null;
        this._router.navigate(['/strategies', { _id: strategyId, foo: 'foo' }]);
    }
}
