import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as models from '../../strategy';

@Injectable()
export class StrategyDataService {
    private _strategies$: Subject<models.StrategyQuery[]>;
    private _dataStore: {
        strategies: models.StrategyQuery[]
    };
    public get strategies$(): Observable<models.StrategyQuery[]> { return this._strategies$.asObservable(); }

    constructor(private http: Http, private _service: models.StrategyService) {
        this._strategies$ = new Subject<models.StrategyQuery[]>();
        this._dataStore = { strategies: [] };
    }
    public loadAll() {

        console.log(`http-service owner at strategy data service level ${(<any>this.http).owner}`);

        this._service.get().subscribe(
            data => {
                this._dataStore.strategies = data;
                this._strategies$.next(this._dataStore.strategies);
            },
            error => console.log('cannot load strategies')
        );
    }
    public get(id: string): Observable<models.StrategyQuery> {
        console.log(`http-service owner at strategy data service level ${(<any>this.http).owner}`);
        return Observable.create(observer => {
            let item = this._dataStore.strategies.find(x => x.id === id);
            if (item) {
                observer.next(item);
                observer.complete();
                return;
            }

            this._service.get(id).subscribe(
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