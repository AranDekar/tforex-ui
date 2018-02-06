import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Error, ErrorTypeEnum, AuthService } from '../../core';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tfrx-error',
    template: `
    <div class="alert alert-danger alert-dismissible" *ngFor='let error of _errors'>
        <button type="button" class="close" data-dismiss="alert" (click)='onCloseAlert(error)'>
            <span aria-hidden="true">&times;</span>
        </button>
        <dl>
        <dt>Error Code: {{ error?.errorCode }} Status Code: {{ error?.statusCode }} Error Message: {{ error?.message|json }}</dt>
        <dd *ngFor='let err of error?.errors'> - {{ err?.message|json }}</dd>
        </dl>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ErrorComponent implements OnInit, OnDestroy {
    private _errors: Error[] = [];
    private _subscription: Subscription;

    constructor(private _http: Http, private _cdr: ChangeDetectorRef, private _authService: AuthService,
        private _router: Router) {
        const o = { key1: 'value1', key2: 'value2' };

        label:
        for (const v in o) {
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
                if (error.message === 'no jwt-token provided!' || error.message === 'access denied!') {
                    this._authService.logout();

                    // Navigate to the login page with extras
                    this._router.navigate(['/login']);
                }
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
