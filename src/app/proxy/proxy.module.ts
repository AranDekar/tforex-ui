import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf,
} from '@angular/core';


import * as proxy from '../proxy';

@NgModule({
    providers: [
        { provide: proxy.BASE_PATH, useValue: 'http://localhost:10020' },
        proxy.DefaultApi,
        proxy.InstrumentApi,
        proxy.StrategyApi,
        proxy.Traderm5Api,
        proxy.UserApi
    ],
})
export class ProxyModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProxyModule,
            providers: [
                { provide: proxy.BASE_PATH, useValue: 'http://localhost:10020' },
                proxy.DefaultApi,
                proxy.InstrumentApi,
                proxy.StrategyApi,
                proxy.Traderm5Api,
                proxy.UserApi
            ],
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: ProxyModule) {
        if (parentModule) {
            throw new Error(
                'module is already loaded. Import it in the AppModule only');
        }
    }
}


