import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as proxy from '../../proxy';

@Injectable()
export class TraderDataService {
    private _traders$: Subject<proxy.TraderQuery[]>;
    private _dataStore: {
        traders: proxy.TraderQuery[]
    };
    public get traders$(): Observable<proxy.TraderQuery[]> { return this._traders$.asObservable(); }

    constructor(private http: Http, private _service: proxy.Traderm5Api) {
        this._traders$ = new Subject<proxy.TraderQuery[]>();
        this._dataStore = { traders: [] };
    }
    public loadAll() {

        console.log(`http-service owner at trader data service level ${(<any>this.http).owner}`);

        this._service.get().subscribe(
            data => {
                this._dataStore.traders = data;
                this._traders$.next(this._dataStore.traders);
            },
            error => console.log('cannot load traders')
        );
    }
    public get(id: string): Observable<proxy.TraderQuery> {
        console.log(`http-service owner at trader data service level ${(<any>this.http).owner}`);
        return Observable.create(observer => {
            const item = this._dataStore.traders.find(x => x.id === id);
            if (item) {
                observer.next(item);
                observer.complete();
                return;
            }

            this._service.get(id).subscribe(
                data => {
                    if (data && data.length === 1) {
                        this._dataStore.traders.push(data[0]);
                        observer.next(data[0]);
                        observer.complete();
                    }
                    this._traders$.next(this._dataStore.traders);
                    return;
                },
                error => console.log('cannot load traders')
            );
        });
    }
}