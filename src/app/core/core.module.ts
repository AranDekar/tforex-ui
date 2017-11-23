import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TForextRouterOutletDirective, ErrorComponent, APP_CONFIG, TforexConfig, httpServiceProvider, AuthService, AuthGuardService, AuthAdminGuardService, CanDeactivateGuardService, DialogService, InstrumentDataService, InstrumentService } from '../core';

@NgModule({
    imports: [CommonModule],
    declarations: [
        TForextRouterOutletDirective,
        ErrorComponent,
    ],
    exports: [
        TForextRouterOutletDirective,
        ErrorComponent,
    ],
    providers: [
        { provide: APP_CONFIG, useValue: TforexConfig },
        httpServiceProvider,
        AuthService,
        AuthGuardService,
        AuthAdminGuardService,
        CanDeactivateGuardService,
        DialogService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        InstrumentDataService,
        InstrumentService,
    ],
})
export class CoreModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: APP_CONFIG, useValue: TforexConfig },
                httpServiceProvider,
                AuthService,
                AuthGuardService,
                AuthAdminGuardService,
                CanDeactivateGuardService,
                DialogService,
                { provide: LocationStrategy, useClass: HashLocationStrategy },
                InstrumentDataService,
                InstrumentService,
            ],
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'odule is already loaded. Import it in the AppModule only');
        }
    }
}


