import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';

import * as trader from '../trader';

@NgModule({
    imports: [
        trader.routing,
        SharedModule,
    ],
    declarations: [
        trader.TraderListComponent,
        trader.TraderComponent,
    ],
    providers: [
        //   core.httpServiceProvider,
        trader.TraderService,
        trader.TraderDataService,
    ],
})
export class TraderModule {
}
