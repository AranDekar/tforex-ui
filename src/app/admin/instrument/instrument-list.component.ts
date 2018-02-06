import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as admin from '../../admin';
import * as shared from '../../shared';
import * as proxy from '../../proxy';


@Component({
    moduleId: module.id,
    templateUrl: 'instrument-list.component.html',
})

export class InstrumentListComponent implements OnInit, OnDestroy {
    private _selectedInstruments: proxy.Instrument[];
    private _sub: Subscription;
    private _granularities: string[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _instrumentService: proxy.InstrumentApi,
    ) {
        for (const item in proxy.Strategy.GranularityEnum) {
            if (item) {
                this._granularities.push(item);
            }
        }
    }

    public ngOnInit() {
        this._sub = this._route
            .params
            .subscribe(params => {
                this._selectedInstruments = params['instruments'];
            });
    }
    public ngOnDestroy() {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onGetInstrumentCandlesInfoClicked(instrument: proxy.Instrument, item: proxy.Strategy.GranularityEnum) {
        console.log('this operation is not implemented yet!');
    }
}
