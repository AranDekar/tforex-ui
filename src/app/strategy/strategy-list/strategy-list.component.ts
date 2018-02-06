import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as strategy from '../../strategy';
import * as shared from '../../shared';
import * as core from '../../core';
import * as proxy from '../../proxy';

@Component({
    moduleId: module.id,
    templateUrl: 'strategy-list.component.html',
    styleUrls: ['strategy-list.component.scss']
})
export class StrategyListComponent implements OnInit, OnDestroy {

    private _strategies$: Observable<proxy.StrategyQuery[]>;
    private _selectedId: string;
    private _sub: Subscription;
    private _userId: string | number | null;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _dataService: strategy.StrategyDataService,
        private _http: Http,
        private authService: core.AuthService
    ) {
    }

    public ngOnInit() {
        this.authService.userId$.subscribe(
            data => this._userId = data,
            error => console.error(error)
        );

        this._strategies$ = this._dataService.strategies$;
        this._dataService.loadAll();

        this._sub = this._route
            .params
            .subscribe(params => {
                this._selectedId = params['_id'];
            });
    }
    public ngOnDestroy() {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    private isSelected(item: proxy.Strategy) { return item._id === this._selectedId; }

    private onSelect(item: proxy.Strategy) {
        // Navigate with Absolute link
        this._router.navigate(['/strategies', item._id]);
    }

    private onBacktestClicked(event, item: proxy.Strategy) {
        // Navigate with Absolute link
        this._router.navigate(['/strategies/backtest', item._id]);
        event.stopPropagation();
    }
}
