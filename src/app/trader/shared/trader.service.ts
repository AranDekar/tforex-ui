import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as models from '../../trader';
import * as core from '../../core';

@Injectable()
export class TraderService {
    protected basePath = 'http://localhost:10020/';
    public defaultHeaders: Headers = new Headers();

    constructor(protected http: Http, @Inject(core.APP_CONFIG) private _config: core.AppConfig) {
        if (_config.apiGatewayBasePath) {
            this.basePath = _config.apiGatewayBasePath;
        }
    }

    /**
     * 
     * adds a new trader-m5 for a user using the trader passed
     * @param payload the required input for the event to create
     */
    public create(payload: models.TraderEventPayload, extraHttpRequestParams?: any): Observable<core.EventResponse> {
        const path = this.basePath + '/tradersm5';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'payload' is not null or undefined
        if (payload === null || payload === undefined) {
            throw new Error('Required parameter payload was null or undefined when calling create.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters,
        };
        requestOptions.body = JSON.stringify(payload);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * gets all trader-m5 for a user
     * @param userId the owner of the traders
     * @param id the optional trader id
     */
    public get(id?: string, extraHttpRequestParams?: any): Observable<Array<models.TraderQuery>> {
        const path = this.basePath + '/tradersm5';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        if (id !== undefined) {
            queryParameters.set('_id', String(id));
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters,
            withCredentials: true,
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }
}
