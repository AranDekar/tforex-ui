import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
    apiGatewayBasePath: string;
    productLibFolder: string;
    isFirmStructureLoadOnDemand: boolean;
    cacheExpiryInMinutes: number;
}

export const TforexConfig: AppConfig = {
    apiGatewayBasePath: 'http://localhost:10020',
    productLibFolder: 'node_modules',
    isFirmStructureLoadOnDemand: true,
    cacheExpiryInMinutes: 1,
};
