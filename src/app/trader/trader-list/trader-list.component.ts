import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as trader from '../../trader';
import * as shared from '../../shared';
import * as core from '../../core';
import * as proxy from '../../proxy';

@Component({
    moduleId: module.id,
    templateUrl: 'trader-list.component.html',
})
export class TraderListComponent implements OnInit, OnDestroy {

    private _traders$: Observable<proxy.TraderQuery[]>;
    private _selectedId: string;
    private _sub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _dataService: core.TraderDataService,
        private _http: Http
    ) {
    }

    public ngOnInit() {
        this._traders$ = this._dataService.traders$;
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

    private isSelected(_trader: proxy.TraderQuery) { return _trader.id === this._selectedId; }

    private onSelect(_trader: proxy.TraderQuery) {
        // Navigate with Absolute link
        this._router.navigate(['/traders', _trader.id]);
    }
}
