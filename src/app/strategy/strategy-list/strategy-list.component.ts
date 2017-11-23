import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as strategy from '../../strategy';
import * as shared from '../../shared';
import * as core from '../../core';


@Component({
    moduleId: module.id,
    templateUrl: 'strategy-list.component.html',
})
export class StrategyListComponent implements OnInit, OnDestroy {

    private _strategies$: Observable<strategy.StrategyQuery[]>;
    private _selectedId: string;
    private _sub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _dataService: strategy.StrategyDataService,
        private _http: Http
    ) {
    }

    public ngOnInit() {
        this._strategies$ = this._dataService.strategies$;
        this._dataService.loadAll();

        this._sub = this._route
            .params
            .subscribe(params => {
                this._selectedId = params['id'];
            });
    }
    public ngOnDestroy() {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    private isSelected(strategy: strategy.Strategy) { return strategy.id === this._selectedId; }

    private onSelect(strategy: strategy.Strategy) {
        // Navigate with Absolute link
        this._router.navigate(['/strategies', strategy.id]);
    }
}
