/**
 * Gateway Service
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models from '../model/models';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';

/* tslint:disable:no-unused-variable member-ordering */


@Injectable()
export class Traderm5Api {
    protected basePath = 'http://localhost:10020/';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     *
     * Extends object by coping non-existing properties.
     * @param objA object to be extended
     * @param objB source object
     */
    protected extendObj<T1, T2 extends T1>(objA: T1 & T2, objB: T2): T1 & T2 {
        for (const key in objB) {
            if (objB.hasOwnProperty(key)) {
                objA[key] = objB[key];
            }
        }
        return objA;
    }

    /**
     *
     * adds a new trader-m5 for a user using the strategy passed
     * @param payload the required input for the event to create
     */
    public create(payload: models.TraderEventPayload, extraHttpRequestParams?: any): Observable<models.EventResponse> {
        return this.createWithHttpInfo(payload, extraHttpRequestParams)
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
     * @param id the optional trader id
     */
    public get(id?: string, extraHttpRequestParams?: any): Observable<Array<models.TraderQuery>> {
        return this.getWithHttpInfo(id, extraHttpRequestParams)
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
     * adds a new trader-m5 for a user using the strategy passed
     * @param payload the required input for the event to create
     */
    public createWithHttpInfo(payload: models.TraderEventPayload, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/tradersm5`;

        const queryParameters = new URLSearchParams();
        const headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'payload' is not null or undefined
        if (payload === null || payload === undefined) {
            throw new Error('Required parameter payload was null or undefined when calling create.');
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        const produces: string[] = [
            'application/json'
        ];

        // authentication (api_key) required
        if (this.configuration.apiKey) {
            headers.set('api-key', this.configuration.apiKey);
        }
        // authentication (jwt) required
        if (this.configuration.apiKey) {
            headers.set('JWT-TOKEN', this.configuration.apiKey);
        }


        headers.set('Content-Type', 'application/json');


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: payload == null ? '' : JSON.stringify(payload), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = this.extendObj(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     *
     * gets all trader-m5 for a user
     * @param id the optional trader id
     */
    public getWithHttpInfo(id?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/tradersm5`;

        const queryParameters = new URLSearchParams();
        const headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (id !== undefined) {
            queryParameters.set('_id', <any>id);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        const produces: string[] = [
            'application/json'
        ];

        // authentication (api_key) required
        if (this.configuration.apiKey) {
            headers.set('api-key', this.configuration.apiKey);
        }
        // authentication (jwt) required
        if (this.configuration.apiKey) {
            headers.set('JWT-TOKEN', this.configuration.apiKey);
        }




        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = this.extendObj(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
