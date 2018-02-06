import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from '@angular/http';

import * as shared from '../../shared';
import * as core from '../../core';

@Injectable()
export class TreeDataProviderSampleService implements shared.TreeDataProvider {

    private _dummyData: shared.TreeNode[] = [
        { _id: 'Books', title: 'Books', path: null },
        { _id: 'Programming', title: 'Programming', path: ',Books,' },
        { _id: 'Databases', title: 'Databases', path: ',Books,Programming,' },
        { _id: 'Languages', title: 'Languages', path: ',Books,Programming,' },
        { _id: 'MongoDB', title: 'MongoDB', path: ',Books,Programming,Databases,' },
        { _id: 'dbm', title: 'dbm', path: ',Books,Programming,Databases,' },

        { _id: 'Classes', title: 'Casses', path: null },
        { _id: 'Cooking', title: 'Cooking', path: ',Classes,' },
        { _id: 'Desert', title: 'Desert', path: ',Classes,Cooking,' },
        { _id: 'Main', title: 'Main', path: ',Classes,Cooking,' },
        { _id: 'Seafood', title: 'Seafood', path: ',Classes,Cooking,Main,' },
        { _id: 'Pizza', title: 'Pizza', path: ',Classes,Cooking,Main,' },
    ];


    private _dataStore: shared.TreeNode[];
    private _searchDataStore: shared.TreeNode[];

    private _searchedTerms: string[] = [];

    constructor(private _http: Http, @Inject(core.APP_CONFIG) private _config: core.AppConfig) {
        this._dataStore = [];
        this.initialiseDataStore();
    }

    /**
     * node: the node ref which is being cliked on the UI
     */
    public loadDescendants(node: shared.TreeNode): Observable<shared.TreeNode[]> {
        if (!node) {
            return this.loadRoots();
        }

        let tempCollection: shared.TreeNode[] = [];
        return Observable.create(observer => {
            if (!node) {
                return;
            }
            let regex: RegExp;
            if (node.path == null) {
                regex = new RegExp('^,' + node.title + ',$');
            } else {
                regex = new RegExp('^' + node.path + node.title + ',$');
            }
            // check if this is already populated, to save an unnecessary remote api call
            if (!this._dataStore.some((x => x.path != null && regex.test(x.path)))) {
                console.warn('GETTING DATA FROM THE SERVER FOR THE ', node._id);
                tempCollection = this._dummyData.filter(x => x.path &&
                    regex.test(x.path));  // to be replaced by a remote api call
                tempCollection.forEach(x => this._dataStore.push(x));
            } else {
                tempCollection = this._dataStore.filter(x => x.path &&
                    regex.test(x.path));  // to be replaced by a remote api call
            }
            observer.next(tempCollection);
            observer.complete();
        });
    }

    public search(term: string): Observable<shared.TreeNode[]> {
        let tempCollection: shared.TreeNode[] = [];
        let regex: RegExp;
        regex = new RegExp(term.toLowerCase());

        return Observable.create(observer => {
            if (this._searchedTerms.indexOf(term.toLowerCase()) > 0) {
                console.log('this term has been searched before');
                tempCollection = this._searchDataStore.filter(x => regex.test(x._id.toLowerCase()));
            } else {
                tempCollection = this._dummyData.filter(x => regex.test(x._id.toLowerCase()));
                tempCollection.forEach(x => this._searchDataStore.push(x));
                this._searchedTerms.push(term.toLowerCase());
            }

            this.loadLinks(tempCollection).subscribe(links => {
                observer.next(links);
                observer.complete();
            });
        });
    }

    private loadLinks(input: shared.TreeNode[]): Observable<shared.TreeNode[]> {

        return Observable.create(observer => {
            for (const item of input) {
                // console.log('looking at ', item._id, ' to load');
                if (!item.path) {
                    // console.log(item._id, ' is a root item so no need to provide links');
                    continue;
                }

                const paths = item.path.split(',');
                // console.log('--- paths are', JSON.stringify(paths));

                for (const path of paths) {
                    if (path.length === 0) {
                        continue;
                    }

                    if (input.some(x => x._id === path)) {
                        // console.log(path, ' is already in inputs');
                        continue;
                    }

                    let searchedItem = this._searchDataStore.find(x => x._id === path);
                    if (!searchedItem) {
                        // console.log('---------------getting ', path, ' from server');

                        searchedItem = this._dummyData.find(x => x._id === path);

                        if (searchedItem) {
                            // console.log('------------------- inserting ', item._id, '  into the local data store')
                            this._searchDataStore.push(searchedItem);
                        }
                    }
                    if (searchedItem) {
                        // console.log('------- ', item._id, ' is inserted into input list now')
                        input.push(searchedItem);
                    }
                }
            }
            observer.next(input);
            observer.complete();
        });
    }

    private loadRoots(): Observable<shared.TreeNode[]> {
        let tempCollection: shared.TreeNode[];

        return Observable.create(observer => {

            if (!this._dataStore.some((x => !x.path))) {  // check if this is already populated, to save an unnecessary remote api call
                console.warn('GETTING DATA FROM THE SERVER FOR THE ROOTS');
                tempCollection = this._dummyData.filter(x => !x.path);  // to be replaced by a remote api call
                tempCollection.forEach(x => this._dataStore.push(x));
            } else {
                tempCollection = this._dataStore.filter(x => !x.path);
            }

            observer.next(tempCollection);
            observer.complete();
        });
    }

    private initialiseDataStore() {

        if (!this._config.isFirmStructureLoadOnDemand) {
            this._dataStore = this._dummyData;
        }

        // reset every 3 minutes to dispose stale data
        setTimeout(function () {
            // this._dataStore.firmStructures = [];
            // console.warn('FIRM STRUCTURE IS CLEAR NOW')
        }, 1000 * 60 * this._config.cacheExpiryInMinutes);
    }
}
