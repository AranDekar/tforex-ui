import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Error, ErrorTypeEnum } from '../../core';

@Component({
    selector: 'tfrx-error',
    template: `

    <div class="alert alert-danger alert-dismissible fade in" role="alert" *ngFor='let error of _errors'>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" (close)='onCloseAlert(error)'>
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Error Code: </strong>{{error?.errorCode}}&nbsp;
        <strong>Status Code: </strong>{{error?.statusCode}}&nbsp;
        <strong>Error Message: </strong>{{error?.message|json}}
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ErrorComponent implements OnInit, OnDestroy {
    private _errors: Error[] = [];
    private _subscription: Subscription;

    constructor(private _http: Http, private _cdr: ChangeDetectorRef) {
        let o = { key1: 'value1', key2: 'value2' };

        label:
        for (let v in o) {
            if (v) {
                // console.log(v);
                // console.log(o[v]);
            } else {
                break label;
            }
        }
    }


    public ngOnInit() {
        console.log(`http-service owner at error component level ${(<any>this._http).owner}`);
        this._subscription = (<any>this._http)._error$.subscribe(
            (error: Error) => {
                console.log('hoooooray');
                this._errors.push(error);
                this._cdr.markForCheck();
            });
    }
    public ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
            console.log(`$ unsubscribed`);
        }
    }
    private onCloseAlert(error: Error) {
        this._errors.splice(this._errors.indexOf(error), 1);
        this._cdr.markForCheck();
    }
    private isTypeGeneric(type: ErrorTypeEnum) {
        return type === ErrorTypeEnum.generic;
    }
}
