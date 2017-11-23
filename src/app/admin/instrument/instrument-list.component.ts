import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as admin from '../../admin';
import * as shared from '../../shared';
import * as core from '../../core';


@Component({
    moduleId: module.id,
    templateUrl: 'instrument-list.component.html',
})

export class InstrumentListComponent implements OnInit, OnDestroy {
    private _selectedInstruments: core.Instrument[];
    private _sub: Subscription;
    private _granularities: string[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _instrumentService: core.InstrumentService,
    ) {
        for (let item in core.GranularityEnum) {
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
    public onActivateGranularityClicked(instrument: core.Instrument, item: core.GranularityEnum) {
        this._instrumentService.syncCandles(core.InstrumentEnum[instrument.title], item).subscribe(
            data => instrument.granularities.push(item.toString()),
            error => console.log(error)
        );
    }
    public onGetInstrumentCandlesInfoClicked(instrument: core.Instrument, item: core.GranularityEnum) {
        console.log('this operation is not implemented yet!');
    }
}
