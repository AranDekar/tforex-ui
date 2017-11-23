import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as models from '../../core';

@Injectable()
export class InstrumentDataService {
    private _instruments$: BehaviorSubject<models.Instrument[]>;
    private _dataStore: {
        instruments: models.Instrument[]
    };
    public get instruments$(): Observable<models.Instrument[]> { return this._instruments$.asObservable(); }

    constructor(private http: Http, private _service: models.InstrumentService) {
        this._instruments$ = new BehaviorSubject<models.Instrument[]>([]);
        this._dataStore = { instruments: [] };
    }
    public loadAll() {
        /*
        let data = [
            { _id: "Books", title: 'Books', path: null },
            { _id: "Programming", title: 'Programming', path: ",Books," },
            { _id: "Databases", title: 'Databases', path: ",Books,Programming," },
            { _id: "Languages", title: 'Languages', path: ",Books,Programming," },
            { _id: "MongoDB", title: 'MongoDB', path: ",Books,Programming,Databases," },
            { _id: "dbm", title: 'dbm', path: ",Books,Programming,Databases," },

            { _id: "Classes", title: 'Classes', path: null },
            { _id: "Cooking", title: 'Cooking', path: ",Classes," },
            { _id: "Desert", title: 'Desert', path: ",Classes,Cooking," },
            { _id: "Main", title: 'Main', path: ",Classes,Cooking," },
            { _id: "Seafood", title: 'Seafood', path: ",Classes,Cooking,Main," },
            { _id: "Pizza", title: 'Pizza', path: ",Classes,Cooking,Main," },
        ];
        this._instruments$.next(data);
        return;
        */

        if (this._dataStore.instruments.length === 0) {
            this._service.getInstruments().subscribe(
                data => {
                    this._dataStore.instruments = data;
                    this._instruments$.next(this._dataStore.instruments);
                },
                error => console.log('cannot load instruments')
            );
        } else {
            this._instruments$.next(this._dataStore.instruments);
        }
    }
    public get(id: string): Observable<models.Instrument> {
        console.log(`http-service owner at instrument data service level ${(<any>this.http).owner}`);
        return Observable.create(observer => {
            let item = this._dataStore.instruments.find(x => x._id === id);
            if (item) {
                observer.next(item);
                observer.complete();
                return;
            }

            this._service.getInstruments(id).subscribe(
                data => {
                    if (data && data.length === 1) {
                        this._dataStore.instruments.push(data[0]);
                        observer.next(data[0]);
                        observer.complete();
                    }
                    this._instruments$.next(this._dataStore.instruments);
                    return;
                },
                error => console.log('cannot load instruments')
            );
        });
    }
}