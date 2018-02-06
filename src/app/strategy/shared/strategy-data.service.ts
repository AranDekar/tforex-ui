import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as proxy from '../../proxy';

@Injectable()
export class StrategyDataService {
    private _isLoaded: boolean;
    private _strategies$: Subject<proxy.StrategyQuery[]>;
    private _dataStore: {
        strategies: proxy.StrategyQuery[]
    };
    public get strategies$(): Observable<proxy.StrategyQuery[]> { return this._strategies$.asObservable(); }

    constructor(private http: Http, private _service: proxy.StrategyApi) {
        this._strategies$ = new Subject<proxy.StrategyQuery[]>();
        this._dataStore = { strategies: [] };
    }
    public loadAll() {
        console.log(`http-service owner at strategy data service level ${(<any>this.http).owner}`);
        if (!this._isLoaded) {
            this._service.getStrategies(null, { withCredentials: true }).subscribe(
                data => {
                    this._dataStore.strategies = data;
                    this._isLoaded = true;
                    this._strategies$.next(this._dataStore.strategies);
                },
                error => {
                    console.error('cannot load strategies', error);
                }
            );
        }
    }
    public get(id: string): Observable<proxy.StrategyQuery> {
        console.log(`http-service owner at strategy data service level ${(<any>this.http).owner}`);
        return Observable.create(observer => {
            const item = this._dataStore.strategies.find(x => x._id === id);
            if (item) {
                observer.next(item);
                observer.complete();
                return;
            }

            this._service.getStrategies(id, { withCredentials: true }).subscribe(
                data => {
                    if (data && data.length === 1) {
                        this._dataStore.strategies.push(data[0]);
                        observer.next(data[0]);
                        observer.complete();
                    }
                    this._strategies$.next(this._dataStore.strategies);
                    return;
                },
                error => console.log('cannot load strategies')
            );
        });
    }
}
